import Script from "next/script";

export default function GoogleAdSense() {
  return (
    <Script
      async
      strategy="afterInteractive"
      src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9996108075082625"
      crossOrigin="anonymous"
    />
  );
}
