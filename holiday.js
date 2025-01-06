document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("portfolio-form");
    const portfolioOutput = document.getElementById("portfolio-output");
    const outputSection = document.getElementById("output-section");

    form.addEventListener("submit", (event) => {
        event.preventDefault();
        const formData = new FormData(form);
        const portfolioData = extractFormData(formData);
        generatePortfolio(portfolioData);
    });

    function extractFormData(formData) {
        return {
            name: formData.get("name") || "[Your Name]",
            email: formData.get("email") || "[Your Email]",
            phone: formData.get("phone") || "[Your Phone Number]",
            about: formData.get("about") || "[About Me]",
            skills: formData.get("skills") ? formData.get("skills").split(",") : [],
            projects: [
                {
                    name: formData.get("project1") || "[Project 1 Name]",
                    description: formData.get("project1desc") || "[Project 1 Description]"
                },
                {
                    name: formData.get("project2") || "[Project 2 Name]",
                    description: formData.get("project2desc") || "[Project 2 Description]"
                }
            ],
            contact: {
                linkedin: formData.get("linkedin") || "[LinkedIn URL]",
                github: formData.get("github") || "[GitHub URL]",
                portfolio: formData.get("portfolio") || "[Portfolio URL]"
            },
            layout: formData.get("layout") || "single-column",
            theme: formData.get("theme") || "#4CAF50"
        };
    }

    function generatePortfolio(data) {
        portfolioOutput.innerHTML = "";

        const portfolioContainer = document.createElement("div");
        portfolioContainer.style.color = data.theme;

        const nameHeader = document.createElement("h1");
        nameHeader.textContent = data.name;
        portfolioContainer.appendChild(nameHeader);

        const aboutSection = document.createElement("p");
        aboutSection.textContent = `About Me: ${data.about}`;
        portfolioContainer.appendChild(aboutSection);

        const contactList = document.createElement("ul");
        contactList.innerHTML = `
            <li>Email: <a href="mailto:${data.email}">${data.email}</a></li>
            <li>Phone: ${data.phone}</li>
            <li>LinkedIn: <a href="${data.contact.linkedin}" target="_blank">${data.contact.linkedin}</a></li>
            <li>GitHub: <a href="${data.contact.github}" target="_blank">${data.contact.github}</a></li>
            <li>Portfolio: <a href="${data.contact.portfolio}" target="_blank">${data.contact.portfolio}</a></li>
        `;
        portfolioContainer.appendChild(contactList);

        const skillsSection = document.createElement("section");
        const skillsHeader = document.createElement("h3");
        skillsHeader.textContent = "Skills:";
        skillsSection.appendChild(skillsHeader);

        const skillsList = document.createElement("ul");
        data.skills.forEach(skill => {
            const skillItem = document.createElement("li");
            skillItem.textContent = skill.trim();
            skillsList.appendChild(skillItem);
        });
        skillsSection.appendChild(skillsList);
        portfolioContainer.appendChild(skillsSection);

        const projectsSection = document.createElement("section");
        const projectsHeader = document.createElement("h3");
        projectsHeader.textContent = "Projects:";
        projectsSection.appendChild(projectsHeader);

        data.projects.forEach(project => {
            const projectItem = document.createElement("div");
            projectItem.innerHTML = `<strong>${project.name}</strong>: ${project.description}`;
            projectsSection.appendChild(projectItem);
        });
        portfolioContainer.appendChild(projectsSection);
        portfolioOutput.appendChild(portfolioContainer);

        const copyButton = document.getElementById("copy-button");
        copyButton.style.display = "inline-block";

        copyButton.addEventListener("click", function () {
            const range = document.createRange();
            range.selectNode(portfolioOutput);
            window.getSelection().removeAllRanges();
            window.getSelection().addRange(range);
            document.execCommand("copy");
        });
    }

    const resetButton = document.getElementById("reset-button");
    resetButton.addEventListener("click", function() {
        form.reset();
        portfolioOutput.innerHTML = "";

        const copyButton = document.getElementById("copy-button");
        copyButton.style.display = "none";
    });
});
