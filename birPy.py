# ============================================================
# GOVERNMENT EMPLOYEE BIR INCOME TAX CALCULATOR
# Python Version
# ============================================================


# ============================================================
# 1. TAX BRACKETS
# ============================================================

tax_brackets = [
    {
        "minimum": 0,
        "maximum": 250000,
        "base_tax": 0,
        "rate": 0
    },
    {
        "minimum": 250000,
        "maximum": 400000,
        "base_tax": 0,
        "rate": 0.15
    },
    {
        "minimum": 400000,
        "maximum": 800000,
        "base_tax": 22500,
        "rate": 0.20
    },
    {
        "minimum": 800000,
        "maximum": 2000000,
        "base_tax": 102500,
        "rate": 0.25
    },
    {
        "minimum": 2000000,
        "maximum": 8000000,
        "base_tax": 402500,
        "rate": 0.30
    },
    {
        "minimum": 8000000,
        "maximum": float("inf"),
        "base_tax": 2202500,
        "rate": 0.35
    }
]


# ============================================================
# 2. GOVERNMENT POSITIONS
# ============================================================

government_positions = [
    "Administrative Officer",
    "Teacher",
    "Police Officer",
    "Nurse",
    "Engineer",
    "Clerk",
    "Information Technology Officer",
    "Other"
]


# ============================================================
# 3. EMPLOYEE RECORDS
# ============================================================

employee_records = []


# ============================================================
# 4. OBJECT LITERALS / DICTIONARIES
# ============================================================

government_info = {
    "country": "Philippines",
    "agency_type": "Government Agency",
    "tax_system": "Graduated Income Tax"
}


program_info = {
    "name": "Government Employee BIR Tax Calculator",
    "version": "1.0",
    "year": 2026
}


# ============================================================
# 5. EMPLOYEE CLASS
# ============================================================

class Employee:

    def __init__(self, name, position, employee_id):
        self.name = name
        self.position = position
        self.employee_id = employee_id

    def display_employee(self):
        print(f"Employee Name : {self.name}")
        print(f"Position      : {self.position}")
        print(f"Employee ID   : {self.employee_id}")


# ============================================================
# 6. COMPENSATION CLASS
# ============================================================

class Compensation:

    def __init__(
        self,
        basic_salary,
        allowances,
        thirteenth_month,
        other_benefits,
        gsis,
        philhealth,
        pagibig
    ):
        self.basic_salary = basic_salary
        self.allowances = allowances
        self.thirteenth_month = thirteenth_month
        self.other_benefits = other_benefits

        self.gsis = gsis
        self.philhealth = philhealth
        self.pagibig = pagibig

    def get_gross_compensation(self):

        return (
            self.basic_salary
            + self.allowances
            + self.thirteenth_month
            + self.other_benefits
        )

    def get_mandatory_contributions(self):

        return (
            self.gsis
            + self.philhealth
            + self.pagibig
        )

    def get_non_taxable_benefits(self):

        benefits = (
            self.thirteenth_month
            + self.other_benefits
        )

        return min(benefits, 90000)


# ============================================================
# 7. TAX CALCULATOR CLASS
# ============================================================

class TaxCalculator:

    def calculate_tax(self, income):
        raise NotImplementedError(
            "This method must be implemented."
        )

    def display_tax_result(self):
        raise NotImplementedError(
            "This method must be implemented."
        )


# ============================================================
# 8. GOVERNMENT EMPLOYEE TAX CLASS
# ============================================================

class GovernmentEmployeeTax(TaxCalculator):

    def __init__(self, compensation):

        self.compensation = compensation
        self.taxable_income = 0
        self.tax_due = 0
        self.tax_rate = 0

    def calculate_taxable_income(self):

        gross = self.compensation.get_gross_compensation()

        non_taxable = (
            self.compensation.get_non_taxable_benefits()
        )

        contributions = (
            self.compensation.get_mandatory_contributions()
        )

        self.taxable_income = (
            gross
            - non_taxable
            - contributions
        )

        if self.taxable_income < 0:
            self.taxable_income = 0

        return self.taxable_income

    def calculate_tax(self, income=None):

        if income is None:
            income = self.taxable_income

        result = 0

        # LOOP
        for bracket in tax_brackets:

            if (
                income > bracket["minimum"]
                and income <= bracket["maximum"]
            ):

                result = (
                    bracket["base_tax"]
                    + (
                        income
                        - bracket["minimum"]
                    ) * bracket["rate"]
                )

                self.tax_rate = bracket["rate"]

                break

        self.tax_due = result

        return self.tax_due

    def get_monthly_tax(self):

        return self.tax_due / 12

    def get_tax_status(self):

        if self.taxable_income <= 250000:
            return "NON-TAXABLE"

        return "TAXABLE"

    def display_tax_result(self):

        print("\n==========================================")
        print("          BIR TAX COMPUTATION")
        print("==========================================")

        print(
            f"Gross Compensation : "
            f"{format_currency(self.compensation.get_gross_compensation())}"
        )

        print(
            f"Non-Taxable Benefits : "
            f"{format_currency(self.compensation.get_non_taxable_benefits())}"
        )

        print(
            f"Mandatory Contributions : "
            f"{format_currency(self.compensation.get_mandatory_contributions())}"
        )

        print("------------------------------------------")

        print(
            f"Taxable Income : "
            f"{format_currency(self.taxable_income)}"
        )

        print(
            f"Tax Rate : "
            f"{self.tax_rate * 100:.0f}%"
        )

        print(
            f"Annual Income Tax Due : "
            f"{format_currency(self.tax_due)}"
        )

        print(
            f"Estimated Monthly Tax : "
            f"{format_currency(self.get_monthly_tax())}"
        )

        print(
            f"Tax Status : "
            f"{self.get_tax_status()}"
        )

        print("==========================================")


# ============================================================
# 9. INHERITANCE
# ============================================================

class SpecialGovernmentEmployeeTax(GovernmentEmployeeTax):

    def calculate_tax(self, income=None):

        print(
            "Special government employee tax calculation..."
        )

        return super().calculate_tax(income)


# ============================================================
# 10. ENCAPSULATION
# ============================================================

class SecureTaxRecord:

    def __init__(self, tax_due):

        self.__tax_due = tax_due

    def get_tax_due(self):

        return self.__tax_due

    def set_tax_due(self, new_tax):

        if new_tax >= 0:
            self.__tax_due = new_tax
        else:
            print("Tax cannot be negative.")


# ============================================================
# 11. FUNCTIONS
# ============================================================

def format_currency(amount):

    return f"₱{amount:,.2f}"


def validate_number(value):

    if value < 0:
        return False

    return True


def display_tax_brackets():

    print("\n==========================================")
    print("       PHILIPPINE TAX BRACKETS")
    print("==========================================")

    # LOOP
    for index, bracket in enumerate(tax_brackets):

        if bracket["maximum"] == float("inf"):

            print(
                f"{index + 1}. "
                f"Over ₱8,000,000"
            )

        else:

            print(
                f"{index + 1}. "
                f"{format_currency(bracket['minimum'])}"
                f" - "
                f"{format_currency(bracket['maximum'])}"
            )

    print("==========================================")


def search_employee(name):

    # LOOP
    for record in employee_records:

        employee = record["employee"]

        if employee.name.lower() == name.lower():

            return record

    return None


# ============================================================
# 12. MAIN PROGRAM
# ============================================================

def main():

    print("==========================================")
    print(" GOVERNMENT EMPLOYEE BIR TAX CALCULATOR")
    print("==========================================")

    print(
        f"Program : {program_info['name']}"
    )

    print(
        f"Version : {program_info['version']}"
    )

    print(
        f"Year    : {program_info['year']}"
    )

    print("------------------------------------------")

    print(
        f"Country : {government_info['country']}"
    )

    print(
        f"System  : {government_info['tax_system']}"
    )

    print("==========================================")


    # ========================================================
    # EMPLOYEE
    # ========================================================

    employee1 = Employee(
        "Juan Dela Cruz",
        "Administrative Officer",
        "GOV-001"
    )

    print("\nEMPLOYEE INFORMATION")
    print("------------------------------------------")

    employee1.display_employee()


    # ========================================================
    # COMPENSATION
    # ========================================================

    compensation1 = Compensation(

        480000,   # Basic salary
        60000,    # Allowances
        40000,    # 13th month
        20000,    # Other benefits
        54000,    # GSIS
        12000,    # PhilHealth
        2400      # Pag-IBIG
    )


    print("\nCOMPENSATION INFORMATION")
    print("------------------------------------------")

    print(
        f"Basic Salary      : "
        f"{format_currency(compensation1.basic_salary)}"
    )

    print(
        f"Allowances        : "
        f"{format_currency(compensation1.allowances)}"
    )

    print(
        f"13th Month Pay    : "
        f"{format_currency(compensation1.thirteenth_month)}"
    )

    print(
        f"Other Benefits    : "
        f"{format_currency(compensation1.other_benefits)}"
    )

    print(
        f"GSIS              : "
        f"{format_currency(compensation1.gsis)}"
    )

    print(
        f"PhilHealth        : "
        f"{format_currency(compensation1.philhealth)}"
    )

    print(
        f"Pag-IBIG          : "
        f"{format_currency(compensation1.pagibig)}"
    )


    # ========================================================
    # TAX CALCULATION
    # ========================================================

    tax_calculator = GovernmentEmployeeTax(
        compensation1
    )

    tax_calculator.calculate_taxable_income()

    tax_calculator.calculate_tax()

    tax_calculator.display_tax_result()


    # ========================================================
    # STORE RECORD
    # ========================================================

    employee_records.append({

        "employee": employee1,

        "compensation": compensation1,

        "calculator": tax_calculator
    })


    # ========================================================
    # TAX BRACKETS
    # ========================================================

    display_tax_brackets()


    # ========================================================
    # ENCAPSULATION
    # ========================================================

    print("\nENCAPSULATION")
    print("------------------------------------------")

    secure_record = SecureTaxRecord(
        tax_calculator.tax_due
    )

    print(
        f"Secure Tax Due: "
        f"{format_currency(secure_record.get_tax_due())}"
    )


    # ========================================================
    # INHERITANCE + POLYMORPHISM
    # ========================================================

    print("\nINHERITANCE & POLYMORPHISM")
    print("------------------------------------------")

    special_calculator = (
        SpecialGovernmentEmployeeTax(
            compensation1
        )
    )

    special_calculator.calculate_taxable_income()

    special_calculator.calculate_tax()

    print(
        f"Calculated Tax: "
        f"{format_currency(special_calculator.tax_due)}"
    )


    # ========================================================
    # SEARCH EMPLOYEE
    # ========================================================

    print("\nEMPLOYEE SEARCH")
    print("------------------------------------------")

    found_employee = search_employee(
        "Juan Dela Cruz"
    )

    if found_employee:

        print(
            "Employee found: "
            f"{found_employee['employee'].name}"
        )

    else:

        print("Employee not found.")


    # ========================================================
    # FINAL SUMMARY
    # ========================================================

    print("\n==========================================")
    print("             FINAL SUMMARY")
    print("==========================================")

    print(
        f"Employee       : "
        f"{employee1.name}"
    )

    print(
        f"Position       : "
        f"{employee1.position}"
    )

    print(
        f"Gross Income   : "
        f"{format_currency(compensation1.get_gross_compensation())}"
    )

    print(
        f"Taxable Income : "
        f"{format_currency(tax_calculator.taxable_income)}"
    )

    print(
        f"Income Tax Due : "
        f"{format_currency(tax_calculator.tax_due)}"
    )

    print(
        f"Status         : "
        f"{tax_calculator.get_tax_status()}"
    )

    print("==========================================")
    print("       END OF TAX COMPUTATION")
    print("==========================================")


# ============================================================
# 13. START PROGRAM
# ============================================================

if __name__ == "__main__":
    main()