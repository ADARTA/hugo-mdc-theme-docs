---
weight: 1
heading: "Demo Hugo MDC Theme"
slogan: "[Slogan Goes Here]"
backgroundcolor: "rgba(1,1,1,0.6)"
backgroundimage: "/assets/images/hp-pier.png"
---

<section>
  <h1>Default Theme - <span class="mdc-theme--secondary">No build scripts needed</span></h1>
  <p>You can just include the build from the components CDN and not worry about what is compiled into the theme.</p>

  {{% mdc-link-button href="https://material.io/components/web/" target="_blank" class="mdc-button--raised mdc-theme--primary-bg mdc-theme--text-primary-on-primary" auto="true" value="Material Components - Web" %}}

  {{% mdc-link-button  href="https://gohugo.io/" target="_blank" class="mdc-button--raised mdc-theme--primary-bg mdc-theme--text-primary-on-primary" auto="true" value="Hugo Site" %}}
</section>
<section>
  <h1>Custom Theme - <span class="mdc-theme--secondary">Build scripts; Minimum sized</span></h1>
  <p>The theme you see here was built only using minimal assets. Only the components needed for this site are compiled into the theme.</p>
</section>
<section>
  <h3>Example Components:</h3>
  <ul>
    <li>
        <div>
          <div class="mdc-theme--secondary">Button with Ripple Effect</div>
        <div><p>{{% mdc-button class="mdc-button--raised mdc-theme--primary-bg mdc-theme--text-primary-on-primary" auto="true" value="Click Me Real Good" %}}</p></div><br />
      </div>
    </li>
    <li>
        <div class="mdc-theme--secondary">FAB (Floating Action Button)</div>
        <div><p>{{% mdc-fab-button id="testFab" class="" auto="true" icon="favorite_outline" %}}</p></div><br />
    </li>
    <li>
        <div class="mdc-theme--secondary">Toggle Button (using Material Icons)</div>
        <div><p>
        {{% mdc-toggle-button id="testToggle" class="mdc-fab--plain mdc-theme--primary" labelondesc="Lock" labeloffdesc="Unlock" iconon="lock" iconoff="lock_open" auto="true" %}}
        </p></div>
    </li>
  </ul>
</section>
<section>
  <h3>Shortcode Components:</h3>
  <ul>
    <li>
      <div>
        <div class="mdc-theme--secondary">Button from Front Matter</div>
        <p>
        {{% mdc-link-button class="mdc-button--raised mdc-theme--primary-bg mdc-theme--text-primary-on-primary" auto="true" value="A Button Like This" %}}
        </p>
        <pre><code><span>{{% decode-text text="e3slIG1kYy1saW5rLWJ1dHRvbiBjbGFzcz0ibWRjLWJ1dHRvbi0tcmFpc2VkIG1kYy10aGVtZS0tcHJpbWFyeS1iZyBtZGMtdGhlbWUtLXRleHQtcHJpbWFyeS1vbi1wcmltYXJ5IiBhdXRvPSJ0cnVlIiB2YWx1ZT0iQSBCdXR0b24gTGlrZSBUaGlzIiAlfX0=" %}}</span></code></pre>
      </div>
    </li>
  </ul>
</section>
