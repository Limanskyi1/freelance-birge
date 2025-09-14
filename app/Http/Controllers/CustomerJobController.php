<?php

namespace App\Http\Controllers;

use App\Models\CustomerJob;
use Inertia\Inertia;
use App\Http\Requests\CustomerJob\StoreRequest;
use App\Http\Requests\CustomerJob\UpdateRequest;
use App\Repositories\CustomerJobRepository;
use App\Services\JobAttachmentService;
use App\Services\SearchService;
use Illuminate\Http\Request;

class CustomerJobController extends Controller
{
    public function __construct(
        private CustomerJobRepository $repository,
        private JobAttachmentService $attachmentService,
        private SearchService $searchService,
    ) {
    }

    public function index(Request $request)
    {
        return Inertia::render('customer/job/index.page', [
            'jobs' => $this->searchService->searchJobs($request->get('search', ''), 10, $request->get('category_id')),
        ]);
    }

    public function create()
    {
        return Inertia::render('customer/job/create.page', [
            'categories' => $this->repository->getCategories(),
        ]);
    }

    public function store(StoreRequest $request)
    {
        $data = $request->validated();

        if ($request->hasFile('photo')) {
            $data['photo'] = $this->attachmentService->uploadPhoto(
                $request->file('photo')
            );
        }

        $job = auth()->user()->customerJobs()->create($data);

        return redirect()->route('customer-job.show', $job);
    }

    public function show($id)
    {
        $job = CustomerJob::with('author')->findOrFail($id);

        return Inertia::render('customer/job/show.page', [
            'job' => $job,
        ]);
    }

    public function edit($id)
    {
        $job = auth()->user()->customerJobs()->findOrFail($id);

        return Inertia::render('customer/job/edit.page', [
            'categories' => $this->repository->getCategories(),
            'job' => $job,
        ]);
    }
    public function update(UpdateRequest $request, $id)
    {
        $job = auth()->user()->customerJobs()->findOrFail($id);
        $data = $request->validated();

        if ($request->hasFile('photo')) {
            if ($job->photo) {
                $this->attachmentService->deletePhoto($job->photo);
            }

            $data['photo'] = $this->attachmentService->uploadPhoto(
                $request->file('photo')
            );
        }

        $job->update($data);

        return redirect()->route('customer-job.show', $job)->with('success', 'Работа успешно обновлена.');
    }

    public function destroy($id)
    {
        $job = auth()->user()->customerJobs()->findOrFail($id);

        if ($job->photo) {
            $this->attachmentService->deletePhoto($job->photo);
        }

        $job->delete();

        return redirect()->route('jobs.index')->with('success', 'Работа успешно удалена.');
    }

    public function published($id)
    {
        $job = auth()->user()->customerJobs()->findOrFail($id);
        $job->activate();

        return redirect()->route('dashboard')->with('success', 'Работа успешно опубликована.');
    }

}
