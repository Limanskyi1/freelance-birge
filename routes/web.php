<?php

use App\Http\Controllers\PortfolioController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\SearchController;
use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\CustomerJobController;
use App\Http\Controllers\FreelanceGigController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\TariffController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\CanceledProjectController;
use App\Http\Controllers\DisputController;
use App\Http\Controllers\ReviewController;
use App\Http\Controllers\FavoriteController;

Route::get('/', function () {
    return Inertia::render('welcome.page');
})->name('home');

Route::get('/jobs', function () {
    return Inertia::render('jobs.page');
})->name('jobs');

Route::get('/dashboard', [DashboardController::class, 'dashboard'])->name('dashboard');

// Notification routes
Route::middleware('auth')->group(function () {
    Route::get('/notifications', [NotificationController::class, 'index'])->name('notifications.index');
    Route::get('/notifications/unread', [NotificationController::class, 'unread'])->name('notifications.unread');
    Route::patch('/notifications/{notification}/read', [NotificationController::class, 'markAsRead'])->name('notifications.mark-as-read');
    Route::patch('/notifications/mark-all-read', [NotificationController::class, 'markAllAsRead'])->name('notifications.mark-all-read');
    Route::delete('/notifications/{notification}', [NotificationController::class, 'destroy'])->name('notifications.destroy');
});

// Role routes
Route::middleware('auth')->group(function () {
    Route::get('/user/role', [RoleController::class, 'getUserRole'])->name('user.role');
    Route::post('/user/{id}/switch-role', [RoleController::class, 'switchRole'])->name('user.switch.role');
    Route::post('/user/assign-role', [RoleController::class, 'assignRole'])->name('user.assign.role');
});

// Customer job routes
Route::resource('customer-job', CustomerJobController::class)->except('update');
Route::post('customer-job/{id}/update', [CustomerJobController::class, 'update'])->name('customer-job.update');
Route::post('customer-job/{id}/published', [CustomerJobController::class, 'published'])->name('customer-job.published');

// Freelance gig routes
Route::resource('freelance-gig', FreelanceGigController::class);
Route::post('freelance-gig/{id}/published', [FreelanceGigController::class, 'published'])->name('freelance-gig.published');

// Tariff routes
Route::resource('tariff', TariffController::class);

// Profile routes
Route::resource('profile', ProfileController::class);

// Portfolio routes
Route::resource('portfolio', PortfolioController::class);

// Search routes
Route::middleware('auth')->group(function () {
    Route::get('/search/similar-jobs', [SearchController::class, 'getSimilarJobSuggestions'])->name('search.similar-jobs');
    Route::get('/search/similar-gigs', [SearchController::class, 'getSimilarGigSuggestions'])->name('search.similar-gigs');
    Route::post('/search/jobs', [SearchController::class, 'searchJobs'])->name('search.jobs');
    Route::post('/search/gigs', [SearchController::class, 'searchGigs'])->name('search.gigs');
    Route::get('/search', [SearchController::class, 'index'])->name('search.index');
    Route::get('/search/suggestions', [SearchController::class, 'suggestions'])->name('search.index');
    Route::get('/search/{categoryId}', [SearchController::class, 'show'])->name('search.show');
    Route::post('/search/suggestions', [SearchController::class, 'search'])->name('search.suggestions');
    Route::get('/search/filter-options', [SearchController::class, 'getFilterOptions'])->name('search.filter-options');
});

// Order routes
Route::get('/orders/page', [OrderController::class, 'page'])->name('orders.customer.page');
Route::get('/orders/archive', [OrderController::class, 'archive'])->name('orders.archive');
Route::get('/orders', [OrderController::class, 'index'])->name('orders.customer.index');
Route::get('/orders/{id}', [OrderController::class, 'show'])->name('orders.customer.show');

// Project routes
Route::resource('project', ProjectController::class);
Route::post('project/{id}/archive', [ProjectController::class, 'archive'])->name('project.archive');
Route::post('project/{id}/activate', [ProjectController::class, 'activate'])->name('project.activate');
Route::post('project/{id}/status/{status}', [ProjectController::class, 'status'])->name('project.status');
Route::get('project/{id}/create', [ProjectController::class, 'create'])->name('project.create');


// Canceled project routes
Route::resource('canceled-project', CanceledProjectController::class);

// Disput routes
Route::resource('disput', DisputController::class);

// Review routes
Route::resource('review', ReviewController::class);

// Favorite routes
Route::get('/favorites', [FavoriteController::class, 'index'])->name('favorites.index');
Route::post('/favorites/toggle', [FavoriteController::class, 'toggle'])->name('favorites.toggle');
Route::get('/favorites/check', [FavoriteController::class, 'check'])->name('favorites.check');
Route::get('/favorites/customer-jobs', [FavoriteController::class, 'customerJobs'])->name('favorites.customer-jobs');
Route::get('/favorites/freelance-gigs', [FavoriteController::class, 'freelanceGigs'])->name('favorites.freelance-gigs');
Route::get('/favorites/tariffs', [FavoriteController::class, 'tariffs'])->name('favorites.tariffs');
Route::get('/favorites/customer-jobs/{jobId}/liked', [FavoriteController::class, 'customerJobsLiked'])->name('favorites.customer-jobs.liked');
Route::get('/favorites/freelance-gigs/{gigId}/liked', [FavoriteController::class, 'freelanceGigsLiked'])->name('favorites.freelance-gigs.liked');
Route::get('/favorites/tariffs/{tariffId}/liked', [FavoriteController::class, 'tariffsLiked'])->name('favorites.tariffs.liked');





require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
