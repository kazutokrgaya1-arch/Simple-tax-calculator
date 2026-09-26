// ============================================================
// GOVERNMENT EMPLOYEE BIR INCOME TAX CALCULATOR
// Philippine Individual Income Tax
// JavaScript Only - Educational Project
// ============================================================


// ============================================================
// 1. ARRAYS
// ============================================================

// Array 1: Tax brackets
const taxBrackets = [
    {
        minimum: 0,
        maximum: 250000,
        baseTax: 0,
        rate: 0
    },
    {
        minimum: 250000,
        maximum: 400000,
        baseTax: 0,
        rate: 0.15
    },
    {
        minimum: 400000,
        maximum: 800000,
        baseTax: 22500,
        rate: 0.20
    },
    {
        minimum: 800000,
        maximum: 2000000,
        baseTax: 102500,
        rate: 0.25
    },
    {
        minimum: 2000000,
        maximum: 8000000,
        baseTax: 402500,
        rate: 0.30
    },
    {
        minimum: 8000000,
        maximum: Infinity,
        baseTax: 2202500,
        rate: 0.35
    }
];


// Array 2: Government positions
const governmentPositions = [
    "Administrative Officer",
    "Teacher",
    "Police Officer",
    "Nurse",
    "Engineer",
    "Clerk",
    "Information Technology Officer",
    "Other"
];


// Array 3: Employee records
const employeeRecords = [];


// ============================================================
// 2. OBJECT LITERALS
// ============================================================

// Object literal 1
const governmentInfo = {
    country: "Philippines",
    agencyType: "Government Agency",
    taxSystem: "Graduated Income Tax"
};


// Object literal 2
const programInfo = {
    name: "Government Employee BIR Tax Calculator",
    version: "1.0",
    year: 2026
};


// ============================================================
// 3. CLASS: Employee
// ============================================================

class Employee {

    // Constructor 1
    constructor(name, position, employeeId) {
        this.name = name;
        this.position = position;
        this.employeeId = employeeId;
    }

    displayEmployee() {
        console.log(`Employee Name : ${this.name}`);
        console.log(`Position      : ${this.position}`);
        console.log(`Employee ID   : ${this.employeeId}`);
    }
}


// ============================================================
// 4. CLASS: Compensation
// ============================================================

class Compensation {

    // Constructor 2
    constructor(
        basicSalary,
        allowances,
        thirteenthMonth,
        otherBenefits,
        gsis,
        philhealth,
        pagibig
    ) {
        this.basicSalary = basicSalary;
        this.allowances = allowances;
        this.thirteenthMonth = thirteenthMonth;
        this.otherBenefits = otherBenefits;

        this.gsis = gsis;
        this.philhealth = philhealth;
        this.pagibig = pagibig;
    }


    // Method 1
    getGrossCompensation() {

        return (
            this.basicSalary +
            this.allowances +
            this.thirteenthMonth +
            this.otherBenefits
        );
    }


    // Method 2
    getMandatoryContributions() {

        return (
            this.gsis +
            this.philhealth +
            this.pagibig
        );
    }


    // Method 3
    getNonTaxableBenefits() {

        // BIR exclusion for 13th month pay and other benefits
        const benefitTotal =
            this.thirteenthMonth +
            this.otherBenefits;

        const nonTaxableBenefits =
            Math.min(benefitTotal, 90000);

        return nonTaxableBenefits;
    }
}


// ============================================================
// 5. ABSTRACT CLASS: TaxCalculator
// ============================================================

class TaxCalculator {

    calculateTax(income) {

        throw new Error(
            "calculateTax() must be implemented by a subclass."
        );
    }

    displayTaxResult() {

        throw new Error(
            "displayTaxResult() must be implemented by a subclass."
        );
    }
}


// ============================================================
// 6. CLASS: GovernmentEmployeeTax
// INHERITANCE
// ============================================================

class GovernmentEmployeeTax extends TaxCalculator {

    constructor(compensation) {

        super();

        this.compensation = compensation;
        this.taxableIncome = 0;
        this.taxDue = 0;
        this.taxRate = 0;
    }


    // Method 4
    calculateTaxableIncome() {

        const gross =
            this.compensation.getGrossCompensation();

        const nonTaxableBenefits =
            this.compensation.getNonTaxableBenefits();

        const mandatoryContributions =
            this.compensation.getMandatoryContributions();


        this.taxableIncome =
            gross -
            nonTaxableBenefits -
            mandatoryContributions;


        // Prevent negative taxable income
        if (this.taxableIncome < 0) {
            this.taxableIncome = 0;
        }

        return this.taxableIncome;
    }


    // POLYMORPHISM
    calculateTax(income = this.taxableIncome) {

        let result = 0;

        // LOOP 1
        for (let i = 0; i < taxBrackets.length; i++) {

            const bracket = taxBrackets[i];


            if (
                income > bracket.minimum &&
                income <= bracket.maximum
            ) {

                result =
                    bracket.baseTax +
                    (income - bracket.minimum) *
                    bracket.rate;

                this.taxRate = bracket.rate;

                break;
            }


            // Special case: income over ₱8,000,000
            if (
                income > 8000000 &&
                bracket.minimum === 8000000
            ) {

                result =
                    bracket.baseTax +
                    (income - bracket.minimum) *
                    bracket.rate;

                this.taxRate = bracket.rate;

                break;
            }
        }


        this.taxDue = result;

        return this.taxDue;
    }


    // Method 5
    getMonthlyTaxEstimate() {

        return this.taxDue / 12;
    }


    // Method 6
    getTaxStatus() {

        if (this.taxableIncome <= 250000) {

            return "NON-TAXABLE";
        }

        return "TAXABLE";
    }


    // Method 7
    displayTaxResult() {

        console.log("\n==========================================");
        console.log("          BIR TAX COMPUTATION");
        console.log("==========================================");

        console.log(
            `Gross Compensation : ${formatCurrency(
                this.compensation.getGrossCompensation()
            )}`
        );

        console.log(
            `Non-Taxable Benefits : ${formatCurrency(
                this.compensation.getNonTaxableBenefits()
            )}`
        );

        console.log(
            `Mandatory Contributions : ${formatCurrency(
                this.compensation.getMandatoryContributions()
            )}`
        );

        console.log("------------------------------------------");

        console.log(
            `Taxable Income : ${formatCurrency(
                this.taxableIncome
            )}`
        );

        console.log(
            `Tax Rate : ${(this.taxRate * 100).toFixed(0)}%`
        );

        console.log(
            `Annual Income Tax Due : ${formatCurrency(
                this.taxDue
            )}`
        );

        console.log(
            `Estimated Monthly Tax : ${formatCurrency(
                this.getMonthlyTaxEstimate()
            )}`
        );

        console.log(
            `Tax Status : ${this.getTaxStatus()}`
        );

        console.log("==========================================");
    }
}


// ============================================================
// 7. INHERITANCE + POLYMORPHISM
// ============================================================

class SpecialGovernmentEmployeeTax
    extends GovernmentEmployeeTax {

    calculateTax(income = this.taxableIncome) {

        console.log(
            "Special government employee tax calculation..."
        );

        return super.calculateTax(income);
    }
}


// ============================================================
// 8. ENCAPSULATION
// ============================================================

class SecureTaxRecord {

    #taxDue;

    constructor(taxDue) {

        this.#taxDue = taxDue;
    }


    getTaxDue() {

        return this.#taxDue;
    }


    setTaxDue(newTax) {

        if (newTax >= 0) {

            this.#taxDue = newTax;

        } else {

            console.log(
                "Tax cannot be negative."
            );
        }
    }
}


// ============================================================
// 9. UTILITY FUNCTIONS
// ============================================================

function formatCurrency(amount) {

    return new Intl.NumberFormat(
        "en-PH",
        {
            style: "currency",
            currency: "PHP"
        }
    ).format(amount);
}


// Function for input validation
function validateNumber(value) {

    if (
        typeof value !== "number" ||
        Number.isNaN(value) ||
        value < 0
    ) {

        return false;
    }

    return true;
}


// Function to calculate annual salary
function calculateAnnualSalary(monthlySalary) {

    if (!validateNumber(monthlySalary)) {

        return 0;
    }

    return monthlySalary * 12;
}


// Function to print tax bracket
function displayTaxBrackets() {

    console.log("\n==========================================");
    console.log("       PHILIPPINE TAX BRACKETS");
    console.log("==========================================");

    // LOOP 2
    taxBrackets.forEach((bracket, index) => {

        if (bracket.maximum === Infinity) {

            console.log(
                `${index + 1}. Over ₱8,000,000`
            );

        } else {

            console.log(
                `${index + 1}. ${formatCurrency(
                    bracket.minimum
                )} - ${formatCurrency(
                    bracket.maximum
                )}`
            );
        }
    });

    console.log("==========================================");
}


// Function to search employee
function searchEmployee(name) {

    // LOOP 3
    for (const employee of employeeRecords) {

        if (
            employee.name.toLowerCase() ===
            name.toLowerCase()
        ) {

            return employee;
        }
    }

    return null;
}


// ============================================================
// 10. SAMPLE EMPLOYEE
// ============================================================

const employee1 = new Employee(
    "Juan Dela Cruz",
    "Administrative Officer",
    "GOV-001"
);


// ============================================================
// 11. SAMPLE COMPENSATION
// ============================================================

const compensation1 = new Compensation(

    // Basic salary
    480000,

    // Allowances
    60000,

    // 13th month pay
    40000,

    // Other benefits
    20000,

    // GSIS
    54000,

    // PhilHealth
    12000,

    // Pag-IBIG
    2400
);


// ============================================================
// 12. CREATE TAX CALCULATOR
// ============================================================

const taxCalculator =
    new GovernmentEmployeeTax(
        compensation1
    );


// ============================================================
// 13. STORE EMPLOYEE RECORD
// ============================================================

employeeRecords.push({
    employee: employee1,
    compensation: compensation1,
    calculator: taxCalculator
});


// ============================================================
// 14. PROGRAM HEADER
// ============================================================

console.clear();

console.log("==========================================");
console.log(" GOVERNMENT EMPLOYEE BIR TAX CALCULATOR");
console.log("==========================================");

console.log(`Program : ${programInfo.name}`);
console.log(`Version : ${programInfo.version}`);
console.log(`Year    : ${programInfo.year}`);

console.log("------------------------------------------");

console.log(
    `Country : ${governmentInfo.country}`
);

console.log(
    `System  : ${governmentInfo.taxSystem}`
);

console.log("==========================================");


// ============================================================
// 15. EMPLOYEE INFORMATION
// ============================================================

console.log("\nEMPLOYEE INFORMATION");
console.log("------------------------------------------");

employee1.displayEmployee();


// ============================================================
// 16. COMPENSATION INFORMATION
// ============================================================

console.log("\nCOMPENSATION INFORMATION");
console.log("------------------------------------------");

console.log(
    `Basic Salary       : ${formatCurrency(
        compensation1.basicSalary
    )}`
);

console.log(
    `Allowances         : ${formatCurrency(
        compensation1.allowances
    )}`
);

console.log(
    `13th Month Pay     : ${formatCurrency(
        compensation1.thirteenthMonth
    )}`
);

console.log(
    `Other Benefits     : ${formatCurrency(
        compensation1.otherBenefits
    )}`
);

console.log(
    `GSIS Contribution  : ${formatCurrency(
        compensation1.gsis
    )}`
);

console.log(
    `PhilHealth         : ${formatCurrency(
        compensation1.philhealth
    )}`
);

console.log(
    `Pag-IBIG           : ${formatCurrency(
        compensation1.pagibig
    )}`
);


// ============================================================
// 17. COMPUTATION
// ============================================================

taxCalculator.calculateTaxableIncome();

taxCalculator.calculateTax();

taxCalculator.displayTaxResult();


// ============================================================
// 18. TAX BRACKETS
// ============================================================

displayTaxBrackets();


// ============================================================
// 19. ENCAPSULATION DEMONSTRATION
// ============================================================

console.log("\nENCAPSULATION");
console.log("------------------------------------------");

const secureRecord =
    new SecureTaxRecord(
        taxCalculator.taxDue
    );

console.log(
    `Secure Tax Due: ${formatCurrency(
        secureRecord.getTaxDue()
    )}`
);


// ============================================================
// 20. INHERITANCE + POLYMORPHISM DEMONSTRATION
// ============================================================

console.log("\nINHERITANCE & POLYMORPHISM");
console.log("------------------------------------------");

const specialCalculator =
    new SpecialGovernmentEmployeeTax(
        compensation1
    );

specialCalculator.calculateTaxableIncome();

specialCalculator.calculateTax();

console.log(
    `Calculated Tax: ${formatCurrency(
        specialCalculator.taxDue
    )}`
);


// ============================================================
// 21. SEARCH EMPLOYEE
// ============================================================

console.log("\nEMPLOYEE SEARCH");
console.log("------------------------------------------");

const foundEmployee =
    searchEmployee("Juan Dela Cruz");

if (foundEmployee) {

    console.log(
        `Employee found: ${foundEmployee.employee.name}`
    );

} else {

    console.log("Employee not found.");
}


// ============================================================
// 22. FINAL SUMMARY
// ============================================================

console.log("\n==========================================");
console.log("             FINAL SUMMARY");
console.log("==========================================");

console.log(
    `Employee       : ${employee1.name}`
);

console.log(
    `Position       : ${employee1.position}`
);

console.log(
    `Gross Income   : ${formatCurrency(
        compensation1.getGrossCompensation()
    )}`
);

console.log(
    `Taxable Income : ${formatCurrency(
        taxCalculator.taxableIncome
    )}`
);

console.log(
    `Income Tax Due : ${formatCurrency(
        taxCalculator.taxDue
    )}`
);

console.log(
    `Status         : ${taxCalculator.getTaxStatus()}`
);

console.log("==========================================");
console.log("       END OF TAX COMPUTATION");
console.log("==========================================");