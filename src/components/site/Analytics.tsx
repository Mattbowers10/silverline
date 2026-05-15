import Script from "next/script";

/**
 * Analytics scripts. Env-gated — nothing loads unless the corresponding
 * env var is set. Recommend wiring GA4 + Meta Pixel inside GTM so only
 * NEXT_PUBLIC_GTM_ID is needed for the broader stack.
 *
 * Clarity is loaded directly because its script is tiny and the env-flag
 * helps us flip it off per-environment without touching GTM.
 */
export function Analytics() {
  const gtm = process.env.NEXT_PUBLIC_GTM_ID;
  const clarity = process.env.NEXT_PUBLIC_CLARITY_ID;

  return (
    <>
      {gtm ? (
        <>
          <Script id="gtm-init" strategy="afterInteractive">
            {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${gtm}');`}
          </Script>
          {/* noscript fallback */}
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${gtm}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
              title="GTM"
            />
          </noscript>
        </>
      ) : null}

      {clarity ? (
        <Script id="ms-clarity" strategy="afterInteractive">
          {`(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window,document,"clarity","script","${clarity}");`}
        </Script>
      ) : null}
    </>
  );
}
