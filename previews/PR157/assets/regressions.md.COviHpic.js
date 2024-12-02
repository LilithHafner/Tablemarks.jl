import{_ as i,c as a,a5 as e,o as t}from"./chunks/framework.rx6Iergl.js";const d=JSON.parse('{"title":"How to use Chairmarks for regression testing","description":"","frontmatter":{},"headers":[],"relativePath":"regressions.md","filePath":"regressions.md","lastUpdated":null}'),n={name:"regressions.md"};function r(h,s,l,p,k,o){return t(),a("div",null,s[0]||(s[0]=[e(`<h1 id="How-to-use-Chairmarks-for-regression-testing" tabindex="-1">How to use Chairmarks for regression testing <a class="header-anchor" href="#How-to-use-Chairmarks-for-regression-testing" aria-label="Permalink to &quot;How to use Chairmarks for regression testing {#How-to-use-Chairmarks-for-regression-testing}&quot;">​</a></h1><div class="warning custom-block"><p class="custom-block-title">Regression Testing is a Work in Progress</p><p>Regression testing is a difficult task. RegressionTests.jl has ambitious goals and is already state of the art within the Julia ecosystem, but it is very much a work in progress. Proceed at your own risk, or wait for that package to reach maturity.</p></div><p>Use <a href="https://github.com/LilithHafner/RegressionTests.jl" target="_blank" rel="noreferrer"><code>RegressionTests.jl</code></a>! Make a file <code>bench/runbenchmarks.jl</code> with the following content:</p><div class="language-julia vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">julia</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">using</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Chairmarks, RegressionTests</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">using</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> MyPackage</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">@track</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> @be</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> MyPackage</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">compute_thing</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">@track</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> @be</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> MyPackage</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">compute_thing</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1000</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span></code></pre></div><p>And add the following to your <code>test/runtests.jl</code>:</p><div class="language-julia vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">julia</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">using</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> RegressionTests</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">@testset</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;Regression tests&quot;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> begin</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    RegressionTests</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">test</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(skip_unsupported_platforms</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">true</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">end</span></span></code></pre></div><p>See the <a href="https://github.com/LilithHafner/RegressionTests.jl" target="_blank" rel="noreferrer">RegressionTests.jl documentation</a> for more information.</p>`,7)]))}const c=i(n,[["render",r]]);export{d as __pageData,c as default};
