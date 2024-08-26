import React from 'react';
import './ShareButtons.css'; // Importing a CSS file for styling if needed

const ShareButtons = ({ title, content }) => {
  const shareUrl = encodeURIComponent(window.location.href);
  const shareText = encodeURIComponent(`${title}\n\n${content}`);

  return (
    <div className="share-buttons">
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on Facebook"
      >
        Share on Facebook
      </a>
      <a
        href={`https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareText}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on Twitter"
      >
        Share on Twitter
      </a>
    </div>
  );
};

export default ShareButtons;
