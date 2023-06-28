<?php

namespace App\Http\Middleware;

use Closure;

class CorsMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param \Illuminate\Http\Request $request
     * @param \Closure $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $headers = [
            'Access-Control-Allow-Origin' => '*',
            'Access-Control-Allow-Methods' => 'POST, GET, PUT, OPTIONS, DELETE',
            'Access-Control-Allow-Credentials' => 'true',
            'Access-Control-Allow-Max-Age' => '86400',
            'Access-Control-Allow-Headers' => 'Content-Type, Authorization, X-Requested-With',
        ];

        // Allow the OPTIONS request to proceed to the route handling
        if ($request->isMethod('OPTIONS')) {
            $headers['Access-Control-Allow-Headers'] = $request->header('Access-Control-Request-Headers');
            return response()->make('', 200, $headers);
        }

        $response = $next($request);

        foreach ($headers as $key => $value) {
            $response->header($key, $value);
        }

        return $response;
    }
}
