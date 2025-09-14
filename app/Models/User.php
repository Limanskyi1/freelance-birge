<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Pest\ArchPresets\Custom;

class User extends Authenticatable
{
    use HasFactory, Notifiable;

    protected $fillable = [
        'telegram_id',
        'username',
        'first_name',
        'last_name',
        'avatar',
        'bio',

        'balance',
        'rating',

        'orders_count',
        'completed_orders_count',
        'canceled_orders_count',
        'disputes_count',
        'win_disputes_count',
        'lose_disputes_count',
        'referrals_count',

        'seed_phrase',
        'pin_code',
        'pin_code_attempts',
        'pin_code_blocked_until',
        'email',
        'email_verified_at',
    ];

    protected function casts(): array
    {
        return [
            'telegram_id' => 'string',
            'seed_phrase' => 'encrypted:array',
            'pin_code' => 'encrypted',
            'pin_code_blocked_until' => 'datetime',
            'email_verified_at' => 'datetime',
        ];
    }

    public function roles()
    {
        return $this->belongsToMany(Role::class, 'role_user');
    }

    public function freelancerJobs()
    {
        return $this->hasMany(Custom::class, 'user_id');
    }

    public function customerJobs()
    {
        return $this->hasMany(CustomerJob::class, 'author_id');
    }

    public function freelanceGigs()
    {
        return $this->hasMany(FreelanceGig::class, 'user_id');
    }

    public function projects()
    {
        return $this->hasMany(Project::class,'author_id');
    }
    public function canceledProjects()
    {
        return $this->hasMany(CanceledProject::class);
    }

    public function disputes()
    {
        return $this->hasMany(Disput::class);
    }

    public function reviews()
    {
        return $this->hasMany(Review::class);
    }

    public function hasRole($slug)
    {
        return $this->roles()->where('slug', $slug)->exists();
    }

    public function skills()
    {
        return $this->belongsToMany(Skill::class, 'user_skills');
    }

    public function languages()
    {
        return $this->belongsToMany(Language::class, 'user_languages');
    }

    public function badges()
    {
        return $this->belongsToMany(Badge::class, 'user_badges');
    }

    public function isPinCodeBlocked(): bool
    {
        if ($this->pin_code_blocked_until && now()->greaterThan($this->pin_code_blocked_until)) {
            $this->pin_code_blocked_until = null;
            $this->save();
        }
        return $this->pin_code_blocked_until && now()->lessThan($this->pin_code_blocked_until);
    }

    public function profile()
    {
        return $this->belongsTo(Profile::class, "id", "user_id");
    }

    public function notifications()
    {
        return $this->hasMany(Notification::class);
    }

    public function favorites()
    {
        return $this->hasMany(Favorite::class);
    }

    public function getRoleAttribute()
    {
        $role = $this->roles()->first();
        return $role ? $role->slug : null;
    }

    public function getIsCustomerAttribute()
    {
        return $this->hasRole('customer');
    }

    public function getIsFreelancerAttribute()
    {
        return $this->hasRole('freelancer');
    }
}
