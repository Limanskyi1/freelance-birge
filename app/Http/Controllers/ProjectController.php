<?php

namespace App\Http\Controllers;

use App\Models\CustomerJob;
use App\Models\FreelanceGig;
use App\Models\Project;
use App\Http\Requests\Project\StoreRequest;
use Inertia\Inertia;

class ProjectController extends Controller
{
    public function index()
    {
        // dd(123);
        $user = auth()->user();

        $projects = $user->projects()
            ->where('is_active', true)
            ->with('customerJob', 'freelanceGig')
            ->get();

        return response()->json([
            'projects' => $projects ?? [],
        ]);
    }

    public function show($id)
    {
        $project = Project::with('customerJob', 'freelanceGig')->findOrFail($id);
        return Inertia::render('project/show.page', [
            'project' => $project,
        ]);
    }

    public function store(StoreRequest $request)
    {
        $data = $request->validated();

        $project = Project::create($data);

        return response()->json([
            'project' => $project,
        ]);
    }

    public function update(StoreRequest $request, Project $project)
    {
        $data = $request->validated();

        $project->update($data);

        return response()->json([
            'project' => $project,
        ]);
    }

    public function destroy(Project $project)
    {
        $project->delete();

        return response()->json([
            'message' => 'Project deleted successfully',
        ]);
    }

    public function archive(Project $project)
    {
        $project->archive();

        return response()->json([
            'message' => 'Project archived successfully',
        ]);
    }

    public function activate(Project $project)
    {
        $project->activate();

        return response()->json([
            'message' => 'Project activated successfully',
        ]);
    }
    public function status(Project $project, $status)
    {
        $project->status($status);

        return response()->json([
            'message' => 'Project status updated successfully',
        ]);
    }

    public function create($id)
    {
        $user = auth()->user();
        $role = $user->role;
        if ($role !== 'customer') {
            $order = CustomerJob::with('author')->findOrFail($id);
        } else {
            $order = FreelanceGig::with("tariffs", "freelancer")->findOrFail($id);
        }
        return Inertia::render('project/create.page', [
            'order' => $order,
        ]);
    }
}
