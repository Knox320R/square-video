<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ContentResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        // If resource is already an array from the service, return it
        if (is_array($this->resource)) {
            return $this->resource;
        }

        return parent::toArray($request);
    }
}
