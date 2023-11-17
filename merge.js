// so now we need an utility of nodejs which can merge pdfs

//so we searched for that in google ("merge pdfs nodejs") ani did 
// npm install --save pdf-merger-js
//kaile kai library/utility haru work nagarla but most of the time garcha

//we copy pasted this from the same google search ma usage kasri garne part
//and made changes

const PDFMerger = require('pdf-merger-js');

var merger = new PDFMerger();

const mergePdfs=(async (p1,p2) => {
    //p1,p2 chai the two pdfs that need to be merged, parameters of function

  await merger.add(p1);  //merge all pages. parameter is the path to file and filename.
  await merger.add(p2); // merge whole pdf1 with whole pdf2
 //  await merger.add('2.pdf', 2); // merge pdf1 with only page 2 of pdf2
//   await merger.add('pdf2.pdf', [1, 3]); // merge the pages 1 and 3
//   await merger.add('pdf2.pdf', '4, 7, 8'); // merge the pages 4, 7 and 8
//   await merger.add('pdf3.pdf', '3 to 5'); //merge pages 3 to 5 (3,4,5)
//   await merger.add('pdf3.pdf', '3-5'); //merge pages 3 to 5 (3,4,5)

  await merger.save('public files/merged.pdf'); //save in the public files folder
  //under given name and reset the internal document
  //aba eti garera run code garesi(yo merge.js run bhayesi), euta merged.pdf bhanne file
  //bancha, with the merged pdf this is when we know that things are working.

  //so yo merge.js banako tatparya nai tei thyo
  //to test whether pdfs are getting merged or not,
  //and to actually merge the pdfs(it contains the merging logic)

  // Export the merged PDF as a nodejs Buffer
  // const mergedPdfBuffer = await merger.saveAsBuffer();
  // fs.writeSync('merged.pdf', mergedPdfBuffer);
});

module.exports={mergePdfs};
//so tyo mathi ko merge garne async function lai nai export gardeko HTMLDetailsElement,
//ani tyo server.js ma hami teslai import garcham, so that the server can merge pdf now.

