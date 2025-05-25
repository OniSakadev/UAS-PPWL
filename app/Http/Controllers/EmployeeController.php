<?php

namespace App\Http\Controllers;

use App\Models\Employee;
use App\Models\Company;
use App\Models\Skill;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class EmployeeController extends Controller
{
    public function index(): Response
    {
        $employees = Employee::with(['company', 'skills'])->get();

        return Inertia::render('Employees/Index', [
            'employees' => $employees
        ]);
    }

    public function create(): Response
    {
        $companies = Company::all();
        $skills = Skill::all();

        return Inertia::render('Employees/Create', [
            'companies' => $companies,
            'skills' => $skills
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'company_id' => 'required|exists:companies,id',
        ]);

        $employee = Employee::create($request->only(['name', 'company_id']));

        if ($request->has('skills')) {
            $employee->skills()->attach($request->skills);
        }

        return redirect()->route('employees.index')->with('success', 'Employee created successfully.');
    }

    public function edit(Employee $employee): Response
    {
        $companies = Company::all();
        $skills = Skill::all();

        return Inertia::render('Employees/Edit', [
            'employee' => $employee->load('skills'),
            'companies' => $companies,
            'skills' => $skills
        ]);
    }

    public function update(Request $request, Employee $employee)
    {
        $request->validate([
            'name' => 'required',
            'company_id' => 'required|exists:companies,id',
        ]);

        $employee->update($request->only(['name', 'company_id']));

        $employee->skills()->sync($request->skills ?? []);

        return redirect()->route('employees.index')->with('success', 'Employee updated successfully.');
    }

    public function destroy(Employee $employee)
    {
        $employee->delete();

        return redirect()->route('employees.index')->with('success', 'Employee deleted successfully.');
    }
}
