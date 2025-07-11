<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index()
    {
        return Inertia::render('dashboard.page', [
            'jobs' => auth()->user()->customerJobs()->latest()->take(3)->get(),
        ]);
    }
}
