import React, { useState, useEffect } from "react";
import browser from "webextension-polyfill";
import browserInfo from "browser-info";
import queryString from "query-string";
import OptionsContainer from "./OptionContainer";
import manifest from "src/manifest-chrome.json";

export default props => {
  const query = queryString.parse(props.location.search);
  const extensionVersion = manifest.version;

  const [sponsorsHeihgt, setSponsorsHeight] = useState();

  useEffect(() => {
    const setHeight = e => {
      if (e.data[0] !== "setSponsorsHeight") return;
      setSponsorsHeight(e.data[1]);
    };
    window.addEventListener("message", setHeight);
    return () => window.removeEventListener("message", setHeight);
  });

  return (
    <div>
      <p className="contentTitle">{browser.i18n.getMessage("informationLabel")}</p>
      <hr />
      <OptionsContainer
        title={"extName"}
        captions={[]}
        type={"none"}
        updated={query.action === "updated"}
        extraCaption={
          <p className="caption">
            <a href="https://github.com/64mb/simple-translate-yandex-cloud" target="_blank">
              Version {extensionVersion}
            </a> -  <a
              href="https://github.com/64mb"
              target="_blank"
            >
              @64mb
            </a>
          </p>
        }
      />

      <OptionsContainer
        title={"licenseLabel"}
        captions={["Mozilla Public License, Version. 2.0"]}
        useRawCaptions={true}
        type={"none"}
      />
      <hr />
      <OptionsContainer
        title={""}
        captions={[]}
        type={"none"}
        extraCaption={
          <div>
            <p>
              <a href="https://github.com/64mb/simple-translate-yandex-cloud" target="_blank">
                GitHub
              </a>
            </p>
          </div>
        }
      />
    </div>
  );
};
