const puppeteer = require('puppeteer');
const fs = require('fs');

function generatePDF(url) {
  console.log('Launching browser...');
  return puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
    headless: true
  })
  .then(browser => {
    console.log('Browser launched. Creating new page...');
    return browser.newPage()
      .then(page => {
        console.log(`Navigating to ${url}...`);
        return page.goto(url, { waitUntil: 'networkidle0', timeout: 60000 })
          .then(() => {
            console.log('Page loaded. Modifying content...');
            return page.evaluate(() => {
              // Remove header and sidebar (same as before)
              const header = document.querySelector('header');
              if (header) header.remove();

              const sidebarSelectors = ['.sidebar', '#sidebar', '[data-testid="sidebar"]', 'nav', 'aside'];
              sidebarSelectors.forEach(selector => {
                const sidebar = document.querySelector(selector);
                if (sidebar) sidebar.remove();
              });

              // Adjust main content
              const mainContent = document.querySelector('main') || document.querySelector('.main-content') || document.body;
              if (mainContent) {
                mainContent.style.marginLeft = '0';
                mainContent.style.width = '100%';
                mainContent.style.maxWidth = '100%';
              }

              // Remove fixed positioning
              document.querySelectorAll('*').forEach(el => {
                const style = window.getComputedStyle(el);
                if (style.position === 'fixed' || style.position === 'sticky') {
                  el.style.position = 'static';
                }
              });

              document.body.style.width = '100%';
              document.body.style.maxWidth = '100%';

              // Function to keep elements together
              function keepTogether(element) {
                element.style.pageBreakInside = 'avoid';
                element.style.breakInside = 'avoid';
              }

              // New function to prevent headings at the bottom of pages
              function preventOrphanedHeadings() {
                const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
                headings.forEach(heading => {
                  // Ensure the heading stays with the following content
                  heading.style.pageBreakInside = 'avoid';
                  heading.style.breakInside = 'avoid';
                  
                  // Add the invisible element after the heading
                  const spacer = document.createElement('div');
                  spacer.style.height = '100px';
                  spacer.style.marginBottom = '-100px';
                  spacer.style.content = '""';
                  spacer.style.display = 'block';
                  
                  // Insert the spacer after the heading
                  heading.parentNode.insertBefore(spacer, heading.nextSibling);
                  
                  // Wrap the heading, spacer, and next sibling in a container
                  const wrapper = document.createElement('div');
                  wrapper.style.pageBreakInside = 'avoid';
                  wrapper.style.breakInside = 'avoid';
                  
                  heading.parentNode.insertBefore(wrapper, heading);
                  wrapper.appendChild(heading);
                  wrapper.appendChild(spacer);
                  if (heading.nextSibling) {
                    wrapper.appendChild(heading.nextSibling);
                  }
                });
              }

              // Enlarge and move the image in "Oversigt over guiden" to a separate page
              const oversigtSection = document.getElementById('section-oversigt');
              if (oversigtSection) {
                const image = oversigtSection.querySelector('img');
                if (image) {
                  const imagePage = document.createElement('div');
                  imagePage.style.pageBreakBefore = 'always';
                  imagePage.style.pageBreakAfter = 'always';
                  imagePage.style.display = 'flex';
                  imagePage.style.justifyContent = 'center';
                  imagePage.style.alignItems = 'center';
                  imagePage.style.height = '100vh';

                  const enlargedImage = image.cloneNode();
                  enlargedImage.style.maxWidth = '95%';  // Increased from 90% to 95%
                  enlargedImage.style.maxHeight = '95%'; // Increased from 90% to 95%
                  enlargedImage.style.objectFit = 'contain';

                  imagePage.appendChild(enlargedImage);
                  oversigtSection.insertBefore(imagePage, image.parentNode.nextSibling);
                  image.parentNode.remove();
                }
              }

              // Create a prettier table of contents
              const toc = document.createElement('div');
              toc.innerHTML = '<h1 style="text-align: center; color: #333; font-size: 36px;">Indhold</h1>';
              const tocList = document.createElement('ul');
              tocList.style.listStyleType = 'none';
              tocList.style.padding = '0';

              // Define the structure of the table of contents
              const tocStructure = [
                { title: 'Oversigt', id: 'section-oversigt', page: 2 },
                { title: 'Mere om prompt engineering', id: 'section-mere-om-prompt-engineering', page: 4 },
                { 
                  title: 'Begynder', 
                  id: 'section-begynder',
                  page: 9,
                  subsections: [
                    { id: 'giv-sprogmodellen-en-opgave', page: 10 },
                    { id: 'inkluder-detaljer', page: 11 },
                    { id: 'hold-tonen', page: 12 },
                    { id: 'diriger-indholdet', page: 13 },
                    { id: 'specificer-en-laengde', page: 14 },
                    { id: 'specificer-formatet', page: 16 },
                    { id: 'specificer-tonen', page: 20 },
                    { id: 'giv-eksempler', page: 22 },
                    { id: 'bed-modellen-om-at-paatage-sig-et-persona', page: 25 },
                    { id: 'marker-forskellige-dele-af-promptet', page: 26 },
                    { id: 'del-opgaverne-op-i-individuelle-trin', page: 27 },
                    { id: 'bed-om-flere-muligheder', page: 30 },
                    { id: 'bed-modellen-om-at-stille-spoergsmaal', page: 31 },
                    { id: 'brug-af-kontekst-og-baggrundsinformation', page: 33 }
                  ]
                },
                { 
                  title: 'Øvede', 
                  id: 'section-øvede',
                  page: 34,
                  subsections: [
                    { id: 'user-assistant-og-system-roller', page: 35 },
                    { id: 'giv-reference-tekster', page: 37 },
                    { id: 'del-komplekse-opgaver-op-i-mindre-dele', page: 39 },
                    { id: 'giv-modellen-tid-til-at-taenke', page: 41 },
                    { id: 'brug-af-relevant-vidensgenerering', page: 46 },
                    { id: 'chain-of-thought', page: 49 },
                    { id: 'least-to-most-prompting', page: 53 }
                  ]
                },
                { 
                  title: 'Ekspert', 
                  id: 'section-ekspert',
                  page: 55,
                  subsections: [
                    { id: 'load-data-ved-hjælp-af-embeddings', page: 56 },
                    { id: 'implementer-kode-i-din-prompt', page: 58 },
                    { id: 'lav-kald-til-eksterne-systemer', page: 59 },
                    { id: 'tree-of-thought', page: 60 },
                    { id: 'meta-prompting-til-at-lave-nye-prompts', page: 62 },
                    { id: 'valg-af-gode-eksempler-og-active-prompting', page: 63 },
                    { id: 'lav-systematiske-aendringer-og-test-det', page: 65 }
                  ]
                }
              ];

              let pageCount = 2; // Start from page 2 (assuming TOC is page 1)

              function addToToc(item, list, level = 0) {
                const element = document.getElementById(item.id);
                if (element) {
                  const title = element.querySelector('h1, h2, h3, h4, h5, h6');
                  if (title) {
                    const li = document.createElement('li');
                    li.style.margin = '5px 0';
                    li.style.paddingLeft = `${level * 20}px`;
                    li.innerHTML = `
                      <a href="#${item.id}" style="text-decoration: none; color: #0066cc;">
                        ${title.textContent.trim()}
                      </a>
                      <span style="float: right; color: #666;">Side ${item.page}</span>
                    `;
                    list.appendChild(li);

                    if (item.subsections) {
                      const subList = document.createElement('ul');
                      subList.style.listStyleType = 'none';
                      subList.style.padding = '0';
                      item.subsections.forEach(subItem => {
                        addToToc({ id: subItem.id, page: subItem.page }, subList, level + 1);
                      });
                      list.appendChild(subList);
                    }
                  }
                }
              }

              tocStructure.forEach(item => addToToc(item, tocList));

              toc.appendChild(tocList);
              document.body.insertBefore(toc, document.body.firstChild);

              // Modified function to add page breaks for all sections and subsections
              function addPageBreaks(items) {
                items.forEach(item => {
                  const section = document.getElementById(item.id);
                  if (section) {
                    section.style.pageBreakBefore = 'always';
                  }
                  if (item.subsections) {
                    addPageBreaks(item.subsections);
                  }
                });
              }

              addPageBreaks(tocStructure);

              // Remove page break for the first section to avoid an empty page after TOC
              const firstSection = document.getElementById(tocStructure[0].id);
              if (firstSection) {
                firstSection.style.pageBreakBefore = 'auto';
              }

              // Ensure no forced page breaks immediately after TOC
              const tableOfContents = document.querySelector('#table-of-contents');
              if (tableOfContents && tableOfContents.nextElementSibling) {
                tableOfContents.nextElementSibling.style.pageBreakBefore = 'auto';
              }

              // Remove any empty divs or spaces that might cause an empty page
              document.querySelectorAll('div').forEach(div => {
                if (div.innerHTML.trim() === '' && !div.querySelector('img')) {
                  div.remove();
                }
              });

              // Remove forced page break for the first section after TOC
              if (firstSection) {
                const pageBreakBefore = firstSection.previousElementSibling;
                if (pageBreakBefore && pageBreakBefore.style.pageBreakBefore === 'always') {
                  pageBreakBefore.remove();
                }
              }

              // Call the function after other modifications
              preventOrphanedHeadings();

              // New function to keep prompt boxes together
              function keepPromptBoxesTogether() {
                const promptBoxes = document.querySelectorAll('.prompt-box, .system-box');
                promptBoxes.forEach(box => {
                  // Check if the box is shorter than a page
                  if (box.offsetHeight < window.innerHeight) {
                    keepTogether(box);
                  } else {
                    // If the box is longer than a page, allow it to break
                    box.style.pageBreakInside = 'auto';
                    box.style.breakInside = 'auto';
                  }
                });
              }

              // Call the new function after other modifications
              keepPromptBoxesTogether();

              // New function to keep prompt and system boxes together
              function keepPromptSystemBoxesTogether() {
                const boxes = document.querySelectorAll('.bg-blue-100.p-2.my-4.rounded');
                boxes.forEach(box => {
                  if (box.offsetHeight < window.innerHeight) {
                    box.style.pageBreakInside = 'avoid';
                    box.style.breakInside = 'avoid';
                  } else {
                    box.style.pageBreakInside = 'auto';
                    box.style.breakInside = 'auto';
                  }
                });
              }

              // New function to prevent orphaned text
              function preventOrphanedText() {
                const paragraphs = document.querySelectorAll('p, li');
                paragraphs.forEach(p => {
                  const words = p.innerHTML.split(' ');
                  if (words.length > 3) {
                    const lastWords = words.slice(-3).join('&nbsp;');
                    const remainingWords = words.slice(0, -3).join(' ');
                    p.innerHTML = `${remainingWords} ${lastWords}`;
                  }
                });
              }

              // Call the new functions after other modifications
              keepPromptSystemBoxesTogether();
              preventOrphanedText();

              return { pageCount: pageCount - 1 };
            });
          })
          .then((result) => {
            console.log(`Generated table of contents with ${result.pageCount} pages.`);
            console.log('Waiting for 2 seconds...');
            return new Promise(resolve => setTimeout(resolve, 2000));
          })
          .then(() => {
            console.log('Generating PDF...');
            return page.pdf({ 
              format: 'A4',
              printBackground: true,
              margin: { top: '1cm', right: '1cm', bottom: '1cm', left: '1cm' },
              displayHeaderFooter: true,
              headerTemplate: '<div style="font-size: 10px; text-align: right; width: 100%; margin-right: 1cm;">Prompting Guide</div>',
              footerTemplate: '<div style="font-size: 10px; text-align: center; width: 100%;">Side <span class="pageNumber"></span> af <span class="totalPages"></span></div>'
            });
          })
          .then(pdf => {
            console.log(`PDF generated. Size: ${pdf.length} bytes`);
            console.log('Saving PDF to file...');
            fs.writeFileSync('prompting-guide-specified-sections.pdf', pdf);
            console.log('PDF saved successfully as prompting-guide-specified-sections.pdf');
          })
          .catch(error => {
            console.error('Error in PDF generation process:', error);
          });
      })
      .catch(error => {
        console.error('Error creating new page:', error);
      })
      .finally(() => {
        return browser.close()
          .then(() => console.log('Browser closed.'))
          .catch(error => console.error('Error closing browser:', error));
      });
  })
  .catch(error => {
    console.error('Error launching browser:', error);
  });
}

generatePDF('https://www.syv.ai/prompting-guide')
  .then(() => console.log('PDF generation process completed.'))
  .catch(error => console.error('Unhandled error in PDF generation:', error));
