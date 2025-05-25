<?php

namespace App\Http\Controllers;

use App\Models\Company;
use App\Models\Employee;
use App\Models\Skill;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function index(): Response
    {
        // Hitung total data
        $totalEmployees = Employee::count();
        $companiesCount = Company::count();
        $skillsCount = Skill::count();

        // Hitung rata-rata karyawan per perusahaan
        $avgEmployeesPerCompany = $companiesCount > 0 ? round($totalEmployees / $companiesCount, 1) : 0;

        // Data untuk chart posisi karyawan
        $positions = Employee::select('position', DB::raw('count(*) as count'))
            ->groupBy('position')
            ->orderBy('count', 'desc')
            ->get();

        $positionLabels = $positions->pluck('position');
        $positionData = $positions->pluck('count');

        // Data untuk chart skills
        $skills = Skill::withCount('employees')
            ->orderBy('employees_count', 'desc')
            ->limit(5)
            ->get();

        $skillsLabels = $skills->pluck('name');
        $skillsData = $skills->pluck('employees_count');

        // Ambil data companies untuk ditampilkan
        $companies = Company::withCount('employees')->get();
        $topSkills = $skills;

        return Inertia::render('Dashboard/Index', [
            'totalEmployees' => $totalEmployees,
            'companiesCount' => $companiesCount,
            'skillsCount' => $skillsCount,
            'avgEmployeesPerCompany' => $avgEmployeesPerCompany,
            'positionLabels' => $positionLabels,
            'positionData' => $positionData,
            'skillsLabels' => $skillsLabels,
            'skillsData' => $skillsData,
            'companies' => $companies,
            'topSkills' => $topSkills
        ]);
    }
}
