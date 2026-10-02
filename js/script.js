/* =========================================================
   ACCESSHUB
   Final JavaScript
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       MOBILE NAVIGATION
       ===================================================== */

    const menuToggle = document.getElementById("menu-toggle");
    const primaryNavigation =
        document.getElementById("primary-navigation");

    if (menuToggle && primaryNavigation) {

        menuToggle.addEventListener("click", function () {

            const isOpen =
                menuToggle.getAttribute("aria-expanded") === "true";

            menuToggle.setAttribute(
                "aria-expanded",
                String(!isOpen)
            );

            primaryNavigation.classList.toggle(
                "navigation-open",
                !isOpen
            );
        });
    }


    /* =====================================================
       SETTINGS
       ===================================================== */

    const settingsForm =
        document.getElementById("settings-form");

    const SETTINGS_KEY = "accesshubSettings";

    function loadSettings() {

        const savedSettings =
            localStorage.getItem(SETTINGS_KEY);

        if (!savedSettings) {
            return;
        }

        try {

            const settings =
                JSON.parse(savedSettings);

            if (settings.fontSize) {

                document.documentElement.dataset.fontSize =
                    settings.fontSize;

                const fontSize =
                    document.getElementById("font-size");

                if (fontSize) {
                    fontSize.value = settings.fontSize;
                }
            }

            if (settings.reducedMotion !== undefined) {

                document.documentElement.dataset.reducedMotion =
                    String(settings.reducedMotion);

                const reducedMotion =
                    document.getElementById("reduced-motion");

                if (reducedMotion) {
                    reducedMotion.checked =
                        settings.reducedMotion;
                }
            }

            if (settings.highContrast !== undefined) {

                document.documentElement.dataset.highContrast =
                    String(settings.highContrast);

                const highContrast =
                    document.getElementById("high-contrast");

                if (highContrast) {
                    highContrast.checked =
                        settings.highContrast;
                }
            }

            if (settings.issueAlerts !== undefined) {

                const issueAlerts =
                    document.getElementById("issue-alerts");

                if (issueAlerts) {
                    issueAlerts.checked =
                        settings.issueAlerts;
                }
            }

            if (settings.weeklySummary !== undefined) {

                const weeklySummary =
                    document.getElementById("weekly-summary");

                if (weeklySummary) {
                    weeklySummary.checked =
                        settings.weeklySummary;
                }
            }

        } catch (error) {

            console.warn(
                "Unable to load saved settings.",
                error
            );
        }
    }


    if (settingsForm) {

        settingsForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();

                const fontSize =
                    document.getElementById("font-size");

                const reducedMotion =
                    document.getElementById("reduced-motion");

                const highContrast =
                    document.getElementById("high-contrast");

                const issueAlerts =
                    document.getElementById("issue-alerts");

                const weeklySummary =
                    document.getElementById("weekly-summary");

                const settings = {

                    fontSize:
                        fontSize
                            ? fontSize.value
                            : "standard",

                    reducedMotion:
                        reducedMotion
                            ? reducedMotion.checked
                            : false,

                    highContrast:
                        highContrast
                            ? highContrast.checked
                            : false,

                    issueAlerts:
                        issueAlerts
                            ? issueAlerts.checked
                            : true,

                    weeklySummary:
                        weeklySummary
                            ? weeklySummary.checked
                            : true
                };

                localStorage.setItem(
                    SETTINGS_KEY,
                    JSON.stringify(settings)
                );

                document.documentElement.dataset.fontSize =
                    settings.fontSize;

                document.documentElement.dataset.reducedMotion =
                    String(settings.reducedMotion);

                document.documentElement.dataset.highContrast =
                    String(settings.highContrast);

                const status =
                    document.getElementById("settings-status");

                if (status) {

                    status.textContent =
                        "Your accessibility preferences have been saved.";
                }
            }
        );
    }


    /* =====================================================
       REPORT STORAGE
       ===================================================== */

    const REPORTS_KEY = "accesshubReports";

    function getReports() {

        const stored =
            localStorage.getItem(REPORTS_KEY);

        if (!stored) {
            return [];
        }

        try {

            return JSON.parse(stored);

        } catch (error) {

            console.warn(
                "Unable to read saved reports.",
                error
            );

            return [];
        }
    }


    function saveReports(reports) {

        localStorage.setItem(
            REPORTS_KEY,
            JSON.stringify(reports)
        );
    }


    /* =====================================================
       REPORT TABLE
       ===================================================== */

    function addReportToTable(report) {

        const tableBody =
            document.getElementById(
                "reports-table-body"
            );

        if (!tableBody) {
            return;
        }

        const row =
            document.createElement("tr");

        const serviceCell =
            document.createElement("td");

        const issueCell =
            document.createElement("td");

        const priorityCell =
            document.createElement("td");

        const descriptionCell =
            document.createElement("td");


        serviceCell.textContent =
            report.service;

        issueCell.textContent =
            report.issueType;

        descriptionCell.textContent =
            report.description;


        const priorityTag =
            document.createElement("span");

        priorityTag.className =
            "tag";


        if (report.priority === "High") {

            priorityTag.classList.add(
                "tag-warning"
            );

        } else if (report.priority === "Medium") {

            priorityTag.classList.add(
                "tag-progress"
            );

        } else {

            priorityTag.classList.add(
                "tag-success"
            );
        }


        priorityTag.textContent =
            report.priority;


        priorityCell.appendChild(
            priorityTag
        );


        row.appendChild(serviceCell);
        row.appendChild(issueCell);
        row.appendChild(priorityCell);
        row.appendChild(descriptionCell);


        tableBody.appendChild(row);
    }


    function displayReports() {

        const tableBody =
            document.getElementById(
                "reports-table-body"
            );

        if (!tableBody) {
            return;
        }

        tableBody.innerHTML = "";

        const reports =
            getReports();

        reports.forEach(function (report) {

            addReportToTable(report);

        });


        const reportCount =
            document.getElementById(
                "report-count"
            );

        if (reportCount) {

            reportCount.textContent =
                reports.length;
        }
    }


    /* =====================================================
       ISSUE COUNT
       ===================================================== */

    function updateIssueCounts() {

        const openIssues =
            document.getElementById(
                "dashboard-open-issues"
            );

        if (!openIssues) {
            return;
        }

        const reports =
            getReports();

        const baseIssues = 18;

        openIssues.textContent =
            baseIssues + reports.length;
    }


    /* =====================================================
       PRIORITY COUNTS
       ===================================================== */

    function updatePriorityCounts() {

        const high =
            document.getElementById(
                "high-priority-count"
            );

        const medium =
            document.getElementById(
                "medium-priority-count"
            );

        const low =
            document.getElementById(
                "low-priority-count"
            );

        if (!high && !medium && !low) {
            return;
        }

        const reports =
            getReports();

        let highCount = 0;
        let mediumCount = 0;
        let lowCount = 0;


        reports.forEach(function (report) {

            if (report.priority === "High") {

                highCount++;

            } else if (report.priority === "Medium") {

                mediumCount++;

            } else if (report.priority === "Low") {

                lowCount++;
            }
        });


        if (high) {
            high.textContent =
                highCount;
        }

        if (medium) {
            medium.textContent =
                mediumCount;
        }

        if (low) {
            low.textContent =
                lowCount;
        }
    }


    /* =====================================================
       REPORT FORM
       ===================================================== */

    const reportForm =
        document.getElementById(
            "accessibility-report-form"
        );


    if (reportForm) {

        reportForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();


                const service =
                    document.getElementById(
                        "service"
                    );

                const issueType =
                    document.getElementById(
                        "issue-type"
                    );

                const priority =
                    document.getElementById(
                        "priority"
                    );

                const description =
                    document.getElementById(
                        "description"
                    );

                const status =
                    document.getElementById(
                        "form-status"
                    );


                const serviceValue =
                    service
                        ? service.value.trim()
                        : "";

                const issueTypeValue =
                    issueType
                        ? issueType.value.trim()
                        : "";

                const priorityValue =
                    priority
                        ? priority.value.trim()
                        : "";

                const descriptionValue =
                    description
                        ? description.value.trim()
                        : "";


                if (
                    !serviceValue ||
                    !issueTypeValue ||
                    !priorityValue ||
                    !descriptionValue
                ) {

                    if (status) {

                        status.textContent =
                            "Please complete all required fields.";
                    }

                    return;
                }


                const reports =
                    getReports();


                const newReport = {

                    service:
                        serviceValue,

                    issueType:
                        issueTypeValue,

                    priority:
                        priorityValue,

                    description:
                        descriptionValue,

                    createdAt:
                        new Date().toISOString()
                };


                reports.push(
                    newReport
                );

                saveReports(
                    reports
                );


                if (status) {

                    status.textContent =
                        "Accessibility report submitted successfully.";
                }


                reportForm.reset();


                displayReports();

                updateIssueCounts();

                updatePriorityCounts();
            }
        );
    }


    /* =====================================================
       SERVICE FILTER
       ===================================================== */

    const serviceFilterForm =
        document.getElementById(
            "service-filter-form"
        );

    const serviceSearch =
        document.getElementById(
            "service-search"
        );

    const serviceCategory =
        document.getElementById(
            "service-category"
        );

    const serviceTableBody =
        document.getElementById(
            "services-table-body"
        );

    const filterStatus =
        document.getElementById(
            "service-filter-status"
        );


    function filterServices(event) {

        if (event) {
            event.preventDefault();
        }

        if (
            !serviceTableBody ||
            !serviceSearch ||
            !serviceCategory
        ) {
            return;
        }


        const searchValue =
            serviceSearch.value
                .trim()
                .toLowerCase();

        const categoryValue =
            serviceCategory.value;


        const rows =
            serviceTableBody.querySelectorAll(
                "tr"
            );


        let visibleCount = 0;


        rows.forEach(function (row) {

            const rowText =
                row.textContent.toLowerCase();

            const categoryCell =
                row.children[1];

            const categoryText =
                categoryCell
                    ? categoryCell.textContent.trim()
                    : "";


            const matchesSearch =
                !searchValue ||
                rowText.includes(searchValue);

            const matchesCategory =
                !categoryValue ||
                categoryText === categoryValue;


            const visible =
                matchesSearch &&
                matchesCategory;


            row.hidden =
                !visible;


            if (visible) {
                visibleCount++;
            }
        });


        if (filterStatus) {

            if (
                searchValue ||
                categoryValue
            ) {

                filterStatus.textContent =
                    visibleCount +
                    " service" +
                    (
                        visibleCount === 1
                            ? ""
                            : "s"
                    ) +
                    " found.";

            } else {

                filterStatus.textContent =
                    "";
            }
        }
    }


    if (serviceFilterForm) {

        serviceFilterForm.addEventListener(
            "submit",
            filterServices
        );
    }


    const clearFilters =
        document.getElementById(
            "clear-service-filters"
        );


    if (clearFilters) {

        clearFilters.addEventListener(
            "click",
            function () {

                if (serviceSearch) {
                    serviceSearch.value = "";
                }

                if (serviceCategory) {
                    serviceCategory.value = "";
                }

                filterServices();
            }
        );
    }


    /* =====================================================
       GUIDANCE DIALOG
       ===================================================== */

    const guidanceDialog =
        document.getElementById(
            "guidance-dialog"
        );

    const openGuidance =
        document.getElementById(
            "open-guidance"
        );

    const closeGuidance =
        document.getElementById(
            "close-guidance"
        );


    if (
        guidanceDialog &&
        openGuidance
    ) {

        openGuidance.addEventListener(
            "click",
            function () {

                if (
                    typeof guidanceDialog.showModal ===
                    "function"
                ) {

                    guidanceDialog.showModal();

                } else {

                    guidanceDialog.setAttribute(
                        "open",
                        ""
                    );
                }
            }
        );
    }


    if (
        guidanceDialog &&
        closeGuidance
    ) {

        closeGuidance.addEventListener(
            "click",
            function () {

                guidanceDialog.close();
            }
        );
    }


    if (guidanceDialog) {

        guidanceDialog.addEventListener(
            "click",
            function (event) {

                if (
                    event.target ===
                    guidanceDialog
                ) {

                    guidanceDialog.close();
                }
            }
        );
    }


    /* =====================================================
       INITIALIZE
       ===================================================== */

    loadSettings();

    displayReports();

    updateIssueCounts();

    updatePriorityCounts();

    filterServices();

});