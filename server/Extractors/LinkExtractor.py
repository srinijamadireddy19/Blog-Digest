from urllib.request import urlopen
import re
import trafilatura

class LinkExtractor:
    @staticmethod
    def extract_content(url):
        try:
            downloaded = trafilatura.fetch_url(url)
            if not downloaded:
                return "Could not download content from the URL."
            text = trafilatura.extract(
                downloaded,
                include_comments=False,
                include_tables=True,
                include_formatting=True,
                no_fallback=True
            )
            if not text:
                return "Could not extract content from the URL."
            lines = [line.strip() for line in text.splitlines() if line.strip()]
            formatted_text = "\n".join(lines) + "\n"
            return formatted_text
        except Exception as e:
            return f"An error occurred while extracting content: {str(e)}"

if __name__ == "__main__":
    import sys
    url = sys.argv[1] if len(sys.argv) > 1 else "https://en.wikipedia.org/wiki/Neuro-linguistic_programming"
    print(LinkExtractor.extract_content(url))

