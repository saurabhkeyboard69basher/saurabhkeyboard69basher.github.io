// Custom native SplitText implementation to replace gsap-trial (free & production-ready)
export class SplitText {
  elements: HTMLElement[] = [];
  chars: HTMLElement[] = [];
  words: HTMLElement[] = [];
  lines: HTMLElement[] = [];
  private originals = new Map<HTMLElement, string>();

  constructor(
    target: string | HTMLElement | (string | HTMLElement)[],
    options?: { type?: string; linesClass?: string }
  ) {
    const linesClass = options?.linesClass || "split-line";
    const type = options?.type || "chars,words,lines";
    const wantChars = type.includes("chars");
    const wantWords = type.includes("words");

    const resolveElements = (
      t: string | HTMLElement | (string | HTMLElement)[]
    ): HTMLElement[] => {
      if (Array.isArray(t)) {
        return t.flatMap(resolveElements);
      }
      if (typeof t === "string") {
        return Array.from(document.querySelectorAll<HTMLElement>(t));
      }
      if (t instanceof HTMLElement) {
        return [t];
      }
      return [];
    };

    this.elements = resolveElements(target);

    this.elements.forEach((el) => {
      if (!this.originals.has(el)) {
        this.originals.set(el, el.innerHTML);
      }

      const text = el.textContent || "";
      el.innerHTML = "";

      const wordsArray = text.split(/\s+/).filter(Boolean);
      const lineSpan = document.createElement("span");
      lineSpan.className = linesClass;
      lineSpan.style.display = "inline-block";
      this.lines.push(lineSpan);

      wordsArray.forEach((wordText, wordIdx) => {
        const wordSpan = document.createElement("span");
        wordSpan.className = "split-word";
        wordSpan.style.display = "inline-block";
        wordSpan.style.whiteSpace = "nowrap";

        if (wantChars) {
          for (let i = 0; i < wordText.length; i++) {
            const charSpan = document.createElement("span");
            charSpan.className = "split-char";
            charSpan.style.display = "inline-block";
            charSpan.textContent = wordText[i];
            wordSpan.appendChild(charSpan);
            this.chars.push(charSpan);
          }
        } else {
          wordSpan.textContent = wordText;
        }

        if (wantWords) {
          this.words.push(wordSpan);
        }

        lineSpan.appendChild(wordSpan);

        // Preserve spaces between words
        if (wordIdx < wordsArray.length - 1) {
          const space = document.createTextNode(" ");
          lineSpan.appendChild(space);
        }
      });

      el.appendChild(lineSpan);
    });
  }

  revert() {
    this.originals.forEach((html, el) => {
      el.innerHTML = html;
    });
    this.chars = [];
    this.words = [];
    this.lines = [];
  }
}

export default SplitText;
