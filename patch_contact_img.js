const fs = require('fs');

const htmlFile = 'public/index.html';
let html = fs.readFileSync(htmlFile, 'utf8');

const newSection = `
<!-- BEGIN: ContactBookingSection -->
<section class="py-16 bg-[#09080d]" data-purpose="booking-cta" id="contact">
    <div class="max-w-6xl mx-auto px-4 md:px-6 relative z-10 flex flex-col items-center justify-center">
        <!-- Render the exact uploaded component image -->
        <a href="mailto:contact@tejanjaliofficial.com" class="block w-full transition-transform duration-500 hover:scale-[1.01]">
            <img 
                src="/images/contact-component.png" 
                alt="Let's Create Something Musical - Book For An Event" 
                class="w-full h-auto object-contain rounded-[40px] shadow-2xl border border-[#B75D45]/20"
            />
        </a>
    </div>
</section>
<!-- END: ContactBookingSection -->
`;

const regex = /<!-- BEGIN: ContactBookingSection -->[\s\S]*?<!-- END: ContactBookingSection -->/;
if (regex.test(html)) {
    html = html.replace(regex, newSection.trim());
    fs.writeFileSync(htmlFile, html);
    console.log("Section successfully replaced with the image component.");
} else {
    console.log("Could not find the section.");
}
