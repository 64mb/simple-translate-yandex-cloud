import React from 'react';
import browser from 'webextension-polyfill';
import { getSettings } from 'src/settings/settings';
import openUrl from 'src/common/openUrl';
import CopyButton from './CopyButton';
import ListenButton from './ListenButton';
import '../styles/ResultArea.scss';

const splitLine = (text) => {
  const regex = /(\n)/g;
  return text.split(regex).map((line, i) => (line.match(regex) ? <br key={i} /> : line));
};

export default (props) => {
  const {
    resultText, candidateText, isError, errorMessage, targetLang,
  } = props;
  const shouldShowCandidate = getSettings('ifShowCandidate');
  const translationApi = getSettings('translationApi');

  const handleLinkClick = () => {
    const { inputText, targetLang } = props;
    const encodedText = encodeURIComponent(inputText);
    let translateUrl = '';
    if (translationApi === 'google') {
      translateUrl = `https://translate.google.com/?sl=auto&tl=${targetLang}&text=${encodedText}`;
    } else if (translationApi === 'deepl') {
      translateUrl = `https://www.deepl.com/translator#auto/${targetLang}/${encodedText}`;
    } else if (translationApi === 'yandex-cloud') {
      translateUrl = `https://translate.yandex.ru/?source_lang=auto&target_lang=${targetLang}&text=${encodedText}`;
    }

    openUrl(translateUrl);
  };

  const buttonText = {
    google: 'openInGoogleLabel',
    deepl: 'openInDeeplLabel',
    'yandex-cloud': 'openInYandexLabel',
  };

  return (
    <div id="resultArea">
      <p className="resultText" dir="auto">{splitLine(resultText)}</p>
      {shouldShowCandidate && <p className="candidateText" dir="auto">{splitLine(candidateText)}</p>}
      {isError && <p className="error">{errorMessage}</p>}
      {isError && (
        <p className="translateLink">
          <a onClick={handleLinkClick}>
            {browser.i18n.getMessage(buttonText[translationApi])}
          </a>
        </p>
      )}
      <div className="mediaButtons">
        <CopyButton text={resultText} />
        <ListenButton text={resultText} lang={targetLang} />
      </div>
    </div>
  );
};
