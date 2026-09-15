const fs = require('fs');

const htmlFile = 'public/index.html';
let html = fs.readFileSync(htmlFile, 'utf8');

const newFooter = `
<!-- BEGIN: MainFooter -->
<footer class="bg-[#09080d] w-full" data-purpose="global-footer">
    <div class="w-full">
        <img 
            src="/images/footer-component.png" 
            alt="Tejanjali Footer" 
            class="w-full h-auto object-cover"
        />
    </div>
</footer>
<!-- END: MainFooter -->
`;

const regex = /<!-- BEGIN: MainFooter -->[\s\S]*?<!-- END: MainFooter -->/;
if (regex.test(html)) {
    html = html.replace(regex, newFooter.trim());
    fs.writeFileSync(htmlFile, html);
    console.log("Footer successfully replaced with the image component.");
} else {
    console.log("Could not find the footer section.");
}
