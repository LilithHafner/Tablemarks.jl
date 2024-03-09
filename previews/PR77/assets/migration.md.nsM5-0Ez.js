import{_ as t,c as s,o as i,a7 as e}from"./chunks/framework.CQ_6SoHu.js";const y=JSON.parse('{"title":"How to migrate from BenchmarkTools to Chairmarks","description":"","frontmatter":{},"headers":[],"relativePath":"migration.md","filePath":"migration.md","lastUpdated":null}'),a={name:"migration.md"},n=e(`<h1 id="migration" tabindex="-1">How to migrate from BenchmarkTools to Chairmarks <a class="header-anchor" href="#migration" aria-label="Permalink to &quot;How to migrate from BenchmarkTools to Chairmarks {#migration}&quot;">​</a></h1><p>Chairmarks has a similar samples/evals model to BenchmarkTools. It preserves the keyword arguments <code>samples</code>, <code>evals</code>, and <code>seconds</code>. Unlike BenchmarkTools, the <code>seconds</code> argument is honored even as it drops down to the order of 30μs (<code>@b @b hash(rand()) seconds=.00003</code>). While accuracy does decay as the total number of evaluations and samples decreases, it remains quite reasonable (e.g. I see a noise of about 30% when benchmarking <code>@b hash(rand()) seconds=.00003</code>). This makes it much more reasonable to perform meta-analysis such as computing the time it takes to hash a thousand different lengthed arrays with <code>[@b hash(rand(n)) seconds=.001 for n in 1:1000]</code>.</p><p>Both BenchmarkTools and Chairmarks use an evaluation model structured like this:</p><div class="language-julia vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">julia</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">init</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">()</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">samples </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> []</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">for</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> _ </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">in</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 1</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">samples</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    setup</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">()</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    t0 </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> time</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">()</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    for</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> _ </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">in</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 1</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">evals</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">        f</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">()</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    end</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    t1 </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> time</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">()</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    push!</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(samples, t1 </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> t0)</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    teardown</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">()</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">end</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">return</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> samples</span></span></code></pre></div><p>In BenchmarkTools, you specify <code>f</code> and <code>setup</code> with the invocation <code>@benchmark f setup=(setup)</code>. In Chairmarks, you specify <code>f</code> and <code>setup</code> with the invocation <code>@be setup f</code>. In BenchmarkTools, <code>setup</code> and <code>f</code> communicate via shared local variables in code generated by BenchmarkTools. In Chairmarks, the function <code>f</code> is passed the return value of the function <code>setup</code> as an argument. Chairmarks also lets you specify <code>teardown</code>, which is not possible with BenchmarkTools, and an <code>init</code> which can be emulated with interpolation using BenchmarkTools.</p><p>Here are some examples of corresponding invocations in BenchmarkTools and Chairmarks:</p><table><thead><tr><th style="text-align:right;">BenchmarkTools</th><th style="text-align:right;">Chairmarks</th></tr></thead><tbody><tr><td style="text-align:right;"><code>@btime rand();</code></td><td style="text-align:right;"><code>@b rand()</code></td></tr><tr><td style="text-align:right;"><code>@btime sort!(x) setup=(x=rand(100)) evals=1;</code></td><td style="text-align:right;"><code>@b rand(100) sort! evals=1</code></td></tr><tr><td style="text-align:right;"><code>@btime sort!(x, rev=true) setup=(x=rand(100)) evals=1;</code></td><td style="text-align:right;"><code>@b rand(100) sort!(_, rev=true) evals=1</code></td></tr><tr><td style="text-align:right;"><code>@btime issorted(sort!(x)) || error() setup=(x=rand(100)) evals=1</code></td><td style="text-align:right;"><code>@b rand(100) sort! issorted(_) || error() evals=1</code></td></tr><tr><td style="text-align:right;"><code>let X = rand(100); @btime issorted(sort!($X)) || error() setup=(rand!($X)) evals=1 end</code></td><td style="text-align:right;"><code>@b rand(100) rand! sort! issorted(_) || error() evals=1</code></td></tr></tbody></table><p>For automated regression tests, <a href="https://github.com/LilithHafner/RegressionTests.jl" target="_blank" rel="noreferrer">RegressionTests.jl</a> is a work in progress replacement for the <code>BenchmarkGroup</code> and <code>@benchmarkable</code> system. Because Chairmarks is efficiently and stably autotuned and RegressionTests.jl is inherently robust to noise, there is no need for parameter caching.</p><h3 id="Toplevel-API" tabindex="-1">Toplevel API <a class="header-anchor" href="#Toplevel-API" aria-label="Permalink to &quot;Toplevel API {#Toplevel-API}&quot;">​</a></h3><p>Chairmarks always returns the benchmark result, while BenchmarkTools mirrors the more diverse base API.</p><table><thead><tr><th style="text-align:right;">BenchmarkTools</th><th style="text-align:right;">Chairmarks</th><th style="text-align:right;">Base</th></tr></thead><tbody><tr><td style="text-align:right;"><code>minimum(@benchmark _)</code></td><td style="text-align:right;"><code>@b</code></td><td style="text-align:right;">N/A</td></tr><tr><td style="text-align:right;"><code>@benchmark</code></td><td style="text-align:right;"><code>@be</code></td><td style="text-align:right;">N/A</td></tr><tr><td style="text-align:right;"><code>@belapsed</code></td><td style="text-align:right;"><code>(@b _).time</code></td><td style="text-align:right;"><code>@elapsed</code></td></tr><tr><td style="text-align:right;"><code>@btime</code></td><td style="text-align:right;"><code>display(@b _); _</code></td><td style="text-align:right;"><code>@time</code></td></tr><tr><td style="text-align:right;">N/A</td><td style="text-align:right;"><code>(@b _).allocs</code></td><td style="text-align:right;"><code>@allocations</code></td></tr><tr><td style="text-align:right;"><code>@ballocated</code></td><td style="text-align:right;"><code>(@b _).bytes</code></td><td style="text-align:right;"><code>@allocated</code></td></tr></tbody></table><p>Chairmarks may provide <code>@belapsed</code>, <code>@btime</code>, <code>@ballocated</code>, and <code>@ballocations</code> in the future.</p><h3 id="Fields" tabindex="-1">Fields <a class="header-anchor" href="#Fields" aria-label="Permalink to &quot;Fields {#Fields}&quot;">​</a></h3><p>Benchmark results have the following fields:</p><table><thead><tr><th style="text-align:right;">Chairmarks</th><th style="text-align:right;">BenchmarkTools</th><th style="text-align:right;">Description</th></tr></thead><tbody><tr><td style="text-align:right;"><code>x.time</code></td><td style="text-align:right;"><code>x.time*1e9</code></td><td style="text-align:right;">Runtime in seconds</td></tr><tr><td style="text-align:right;"><code>x.time/1e9</code></td><td style="text-align:right;"><code>x.time</code></td><td style="text-align:right;">Runtime in nanoseconds</td></tr><tr><td style="text-align:right;"><code>x.allocs</code></td><td style="text-align:right;"><code>x.allocs</code></td><td style="text-align:right;">Number of allocations</td></tr><tr><td style="text-align:right;"><code>x.bytes</code></td><td style="text-align:right;"><code>x.memory</code></td><td style="text-align:right;">Number of bytes allocated across all allocations</td></tr><tr><td style="text-align:right;"><code>x.gc_fraction</code></td><td style="text-align:right;"><code>x.gctime / x.time</code></td><td style="text-align:right;">Fraction of time spent in garbage collection</td></tr><tr><td style="text-align:right;"><code>x.gc_time*x.time</code></td><td style="text-align:right;"><code>x.gctime</code></td><td style="text-align:right;">Time spent in garbage collection</td></tr><tr><td style="text-align:right;"><code>x.compile_fraction</code></td><td style="text-align:right;">N/A</td><td style="text-align:right;">Fraction of time spent compiling</td></tr><tr><td style="text-align:right;"><code>x.recompile_fraction</code></td><td style="text-align:right;">N/A</td><td style="text-align:right;">Fraction of time spent compiling which was on recompilation</td></tr><tr><td style="text-align:right;"><code>x.warmup</code></td><td style="text-align:right;"><code>true</code></td><td style="text-align:right;">whether or not the sample had a warmup run before it</td></tr><tr><td style="text-align:right;"><code>x.checksum</code></td><td style="text-align:right;">N/A</td><td style="text-align:right;">a checksum computed from the return values of the benchmarked code</td></tr><tr><td style="text-align:right;"><code>x.evals</code></td><td style="text-align:right;"><code>x.params.evals</code></td><td style="text-align:right;">the number of evaluations in the sample</td></tr></tbody></table><p>Note that more fields may be added as more information becomes available.</p><h3 id="Nonconstant-globals-and-interpolation" tabindex="-1">Nonconstant globals and interpolation <a class="header-anchor" href="#Nonconstant-globals-and-interpolation" aria-label="Permalink to &quot;Nonconstant globals and interpolation {#Nonconstant-globals-and-interpolation}&quot;">​</a></h3><p>Like BenchmarkTools, benchmarks that include access to nonconstant globals will receive a performance overhead for that access and you can avoid this via interpolation.</p><p>However, Chairmarks&#39;s arguments are functions evaluated in the scope of the macro call, not quoted expressions <code>eval</code>ed at global scope. This makes nonconstant global access much less of an issue in Chairmarks than BenchmarkTools which, in turn, eliminates much of the need to interpolate variables. For example, the following invocations are all equally fast:</p><div class="language-julia vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">julia</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">julia</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> x </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 6</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> # nonconstant global</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">6</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">julia</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&gt;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> f</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(len) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> @b</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> rand</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(len) </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># put the \`@b\` call in a function (highest performance for repeated benchmarks)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">f (generic </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">function</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> with </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> method)</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">julia</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&gt;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> f</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(x)</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">15.318</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> ns (</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">2</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> allocs</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 112</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> bytes)</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">julia</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&gt;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> @b</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> rand</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">$</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">x) </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># interpolate (most familiar to BenchmarkTools users)</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">15.620</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> ns (</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">2</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> allocs</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 112</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> bytes)</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">julia</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&gt;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> @b</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> x rand </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># put the access in the setup phase (most concise in simple cases)</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">15.507</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> ns (</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">2</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> allocs</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 112</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> bytes)</span></span></code></pre></div>`,20),l=[n];function h(d,r,o,p,k,c){return i(),s("div",null,l)}const m=t(a,[["render",h]]);export{y as __pageData,m as default};
