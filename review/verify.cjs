const { chromium } = require('playwright');
const AxeBuilder = require('@axe-core/playwright').default;
const assert = require('node:assert/strict');
const fs = require('node:fs');
const root = require('node:path').resolve(__dirname, '..');
const results = [];
const check = (name, condition) => { assert.ok(condition, name); results.push({name,passed:true}); };
(async () => {
  const browser = await chromium.launch({channel:'chrome',headless:true});
  try {
    const context = await browser.newContext({viewport:{width:1440,height:1000},permissions:['clipboard-read','clipboard-write']});
    const page = await context.newPage();
    const errors = [];
    const failed = [];
    page.on('pageerror',e=>errors.push(e.message));
    page.on('requestfailed',r=>failed.push(r.url()));
    const response = await page.goto('http://127.0.0.1:8000', {waitUntil:'networkidle'});
    check('Site responds HTTP 200',response.status()===200);
    for (const width of [320,360,390,430,650,651,768,820,1024,1280,1440,1920]) {
      await page.setViewportSize({width,height:900});
      await page.waitForTimeout(100);
      const overflow = await page.evaluate(()=>({width:innerWidth,scroll:document.documentElement.scrollWidth}));
      check(`No horizontal overflow at ${width}px`,overflow.scroll<=overflow.width);
      for (const id of ['hero','projects','experience','skills','about','education','contact']) {
        check(`${id} is visible at ${width}px`,await page.locator(`#${id}`).isVisible());
      }
    }
    await page.setViewportSize({width:1440,height:1000});
    for (const category of ['llm','agents','edge','all']) {
      await page.locator(`[data-filter="${category}"]`).click();
      check(`Filter ${category} shows correct count`,await page.locator('.project-card:visible').count()===(category==='all'?3:1));
      check(`Filter ${category} announces state`,await page.locator(`[data-filter="${category}"]`).getAttribute('aria-pressed')==='true');
      if(category!=='all') check(`Filter ${category} shows correct project`,await page.locator(`#project-${category}`).isVisible());
    }
    for(const id of ['llm','agents','edge']) {
      const summary=page.locator(`#project-${id} summary`);
      await summary.focus(); await page.keyboard.press('Enter');
      check(`${id} architecture keyboard opens`,await page.locator(`#project-${id} details`).getAttribute('open')!==null);
      await page.keyboard.press('Space');
      check(`${id} architecture keyboard closes`,await page.locator(`#project-${id} details`).getAttribute('open')===null);
    }
    const internal = await page.locator('a[href^="#"]').evaluateAll(links=>links.map(a=>a.getAttribute('href')));
    for(const href of [...new Set(internal)]) check(`Anchor ${href} resolves`,await page.locator(href).count()===1);
    for(const href of ['#projects','#experience','#skills','#about','#contact']) {
      await page.locator(`#primary-nav a[href="${href}"]`).click();
      await page.waitForTimeout(800);
      const top=await page.locator(href).evaluate(el=>el.getBoundingClientRect().top);
      const atBottom=await page.evaluate(()=>innerHeight+scrollY>=document.documentElement.scrollHeight-2);
      check(`Navigation ${href} clears sticky header`,top>=75 && (top<130 || (atBottom && top<700)));
    }
    await page.locator('.copy-email').click();
    check('Clipboard contains exact CV email',await page.evaluate(()=>navigator.clipboard.readText())==='muneebcyan@gmail.com');
    check('Copy success announced',await page.locator('#copy-status').innerText()==='Email address copied.');
    await page.evaluate(()=>Object.defineProperty(navigator.clipboard,'writeText',{configurable:true,value:()=>Promise.reject(new Error('denied'))}));
    await page.locator('.copy-email').click();
    check('Clipboard denial has honest fallback',(await page.locator('#copy-status').innerText()).startsWith('Copy unavailable.'));
    const download=page.waitForEvent('download');
    await page.locator('.hero-actions a[download]').click();
    check('CV download has exact filename',(await download).suggestedFilename()==='Muneeb_Rashid_AI_Engineer_KSA.pdf');
    const localResources=['style.css','script.js','assets/favicon.svg','assets/social-preview.png','Muneeb_Rashid_AI_Engineer_KSA.pdf','robots.txt','sitemap.xml'];
    for(const path of localResources){ const r=await context.request.get('http://127.0.0.1:8000/'+path); check(`${path} HTTP 200`,r.status()===200); }
    const duplicateIds=await page.evaluate(()=>{const ids=[...document.querySelectorAll('[id]')].map(el=>el.id);return ids.filter((id,i)=>ids.indexOf(id)!==i)});
    check('No duplicate IDs',duplicateIds.length===0);
    check('One H1',await page.locator('h1').count()===1);
    check('Structured data parses',await page.locator('script[type="application/ld+json"]').evaluate(el=>JSON.parse(el.textContent).address.addressLocality)==='Riyadh');
    check('External links have noopener',await page.locator('a[target="_blank"]').evaluateAll(links=>links.every(a=>a.rel.includes('noopener'))));
    check('Email matches CV',await page.locator('a[href="mailto:muneebcyan@gmail.com"]').count()===1);
    check('Phone matches CV',await page.locator('a[href="tel:+923330760460"]').count()===1);
    await page.setViewportSize({width:390,height:844});
    await page.goto('http://127.0.0.1:8000');
    check('Mobile menu initially closed',await page.locator('#primary-nav').isHidden());
    await page.locator('.menu-toggle').click();
    check('Mobile menu opens and announces state',await page.locator('.menu-toggle').getAttribute('aria-expanded')==='true');
    await page.keyboard.press('Escape');
    check('Escape closes and restores focus',await page.locator('#primary-nav').isHidden() && await page.locator('.menu-toggle').evaluate(el=>el===document.activeElement));
    await page.locator('.menu-toggle').click();
    await page.locator('#primary-nav a[href="#projects"]').click();
    await page.waitForTimeout(800);
    check('Mobile navigation closes and moves focus',await page.locator('#primary-nav').isHidden() && await page.locator('#projects').evaluate(el=>el===document.activeElement));
    await page.locator('.menu-toggle').click();
    await page.setViewportSize({width:1280,height:900});
    await page.waitForFunction(()=>document.querySelector('.menu-toggle').hidden);
    check('Resize restores desktop navigation',await page.locator('#primary-nav').isVisible() && await page.locator('.menu-toggle').isHidden());
    await page.setViewportSize({width:390,height:844});
    await page.waitForFunction(()=>document.querySelector('#primary-nav').hidden);
    check('Resize resets mobile menu',await page.locator('#primary-nav').isHidden());
    await page.emulateMedia({reducedMotion:'reduce'});
    check('Reduced motion disables smooth scroll',await page.evaluate(()=>getComputedStyle(document.documentElement).scrollBehavior)==='auto');
    check('Reduced motion disables illustration animation',await page.locator('.orbital-lines').evaluate(el=>getComputedStyle(el).animationName)==='none');
    for(const width of [390,1440]) {
      await page.setViewportSize({width,height:1000});
      await page.locator('[data-filter="all"]').click();
      // Include the expanded architecture content in accessibility testing.
      await page.locator('details').evaluateAll(items=>items.forEach(item=>item.open=true));
      const labelAudit=await new AxeBuilder({page}).withRules(['label-content-name-mismatch']).analyze();
      check(`Visible labels match accessible names at ${width}px`,labelAudit.violations.length===0);
      const axe=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21a','wcag21aa','best-practice']).analyze();
      fs.writeFileSync(`${root}/review/axe-${width}.json`,JSON.stringify({violations:axe.violations,incomplete:axe.incomplete.map(x=>({id:x.id,description:x.description})),passes:axe.passes.length},null,2));
      if(axe.violations.length) console.log(JSON.stringify(axe.violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>({target:n.target,summary:n.failureSummary}))})),null,2));
      check(`Axe WCAG 2.1 AA: no violations at ${width}px`,axe.violations.length===0);
      await page.locator('details').evaluateAll(items=>items.forEach(item=>item.open=false));
    }
    const nojs=await browser.newContext({javaScriptEnabled:false,viewport:{width:390,height:844}});
    const fallback=await nojs.newPage(); await fallback.goto('http://127.0.0.1:8000');
    check('No JS: mobile navigation available',await fallback.locator('#primary-nav').isVisible());
    check('No JS: all three projects available',await fallback.locator('.project-card:visible').count()===3);
    await fallback.locator('summary').first().click();
    check('No JS: architecture disclosures work',await fallback.locator('details').first().getAttribute('open')!==null);
    check('No JS: no dead filter controls',await fallback.locator('.project-filters').isHidden());
    await nojs.close();
    await page.goto('http://127.0.0.1:8000');
    await page.keyboard.press('Tab');
    check('Skip link is first keyboard stop',await page.locator('.skip-link').evaluate(el=>el===document.activeElement));
    await page.keyboard.press('Enter');
    check('Skip link moves to main',await page.locator('#main').evaluate(el=>el===document.activeElement));
    check('No JavaScript errors',errors.length===0);
    check('No failed resource requests',failed.length===0);
    await page.locator('#copy-status').evaluate(el=>el.textContent='');
    for(const [name,width,height] of [['desktop',1440,1000],['mobile',390,844],['tablet',768,1024]]) {
      await page.setViewportSize({width,height}); await page.goto('http://127.0.0.1:8000');
      await page.screenshot({path:`${root}/review/${name}.png`,fullPage:true});
      if(name==='desktop') await page.screenshot({path:`${root}/review/desktop-hero.png`});
    }
    fs.writeFileSync(`${root}/review/browser-results.json`,JSON.stringify({browser:await browser.version(),checks:results.length,results,errors,failed},null,2));
    console.log(`PASS: ${results.length} browser checks`);
  } finally { await browser.close(); }
})().catch(error=>{console.error(error);process.exitCode=1});
