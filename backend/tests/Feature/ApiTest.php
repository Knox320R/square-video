<?php

namespace Tests\Feature;

use Tests\TestCase;

class ApiTest extends TestCase
{
    public function test_health_endpoint_returns_ok()
    {
        $response = $this->get('/api/health');
        $response->assertStatus(200)
                 ->assertJson(['status' => 'OK']);
    }

    public function test_content_endpoint_returns_data()
    {
        $response = $this->get('/api/content?limit=5');
        $response->assertStatus(200)
                 ->assertJsonStructure(['data', 'meta']);
    }

    public function test_headers_endpoint_returns_data()
    {
        $response = $this->get('/api/headers');
        $response->assertStatus(200)
                 ->assertJsonStructure(['data']);
    }

    public function test_links_endpoint_returns_data()
    {
        $response = $this->get('/api/links');
        $response->assertStatus(200)
                 ->assertJsonStructure(['data']);
    }
}
