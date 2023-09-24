import React, { useEffect } from 'react';

function Ads() {
  useEffect(() => {
    (adsbygoogle = window.adsbygoogle || []).push({});
  }, []);

  return (
    <div>
      {/* Insérez ici le code HTML de l'espace publicitaire */}
      <ins className="adsbygoogle"
           style={{ display: 'block' }}
           data-ad-client="votre-id-client"
           data-ad-slot="votre-emplacement-de-publicité"
           data-ad-format="auto">
      </ins>
    </div>
  );
}

export default Ads;
