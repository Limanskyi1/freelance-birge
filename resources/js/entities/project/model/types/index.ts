import { Job } from "@/entities/job";

export interface Project {
    id: number;
    price: string;
    terms: number;
    status: string;
    comment: null;
    customer_job_id: number | null;
    freelance_gig_id: number | null;
    tariff_id: number | null;
    freelancer_id: number | null;
    author_id: number;
    is_active: 0 | 1;
    is_offer: 0 | 1;
    created_at: string;
    updated_at: string;
    customer_job: Job;
    freelance_gig: null;
}
