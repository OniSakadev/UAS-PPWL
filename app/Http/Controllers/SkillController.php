<?php

namespace App\Http\Controllers;

use App\Models\Skill;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class SkillController extends Controller
{
    public function index(): Response
    {
        $skills = Skill::with('employees')->get();

        return Inertia::render('Skills/Index', [
            'skills' => $skills
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Skills/Create');
    }

    public function store(Request $request)
    {
        $request->validate(['name' => 'required']);

        Skill::create($request->all());

        return redirect()->route('skills.index')->with('success', 'Skill created successfully.');
    }

    public function edit(Skill $skill): Response
    {
        return Inertia::render('Skills/Edit', [
            'skill' => $skill
        ]);
    }

    public function update(Request $request, Skill $skill)
    {
        $request->validate(['name' => 'required']);

        $skill->update($request->all());

        return redirect()->route('skills.index')->with('success', 'Skill updated successfully.');
    }

    public function destroy(Skill $skill)
    {
        $skill->delete();

        return redirect()->route('skills.index')->with('success', 'Skill deleted successfully.');
    }
}
