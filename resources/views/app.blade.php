<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title inertia>{{ config('app.name', 'Laravel') }}</title>

        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />

        {{-- css --}}
        <style>
            *{
                color: white
            } 

            *::-webkit-scrollbar {
                display: none;
            }

            .text-dasar{
                color:#610C9F
            }

            .text-dasar-cerah {
                color: #940B92
            }

            .bg-dasar{
                background-color: #610C9F
            }

            .bg-dasar-cerah {
                background-color: #940B92
            }

            .bi {
                display: inline-block;
                width: 1rem;
                height: 1rem;
            }

            @media (min-width: 768px) {
                .sidebar .offcanvas-lg {
                position: -webkit-sticky;
                position: sticky;
                top: 48px;
                }
                .navbar-search {
                display: block;
                }
            }

            .sidebar .nav-link {
                font-size: 0.875rem;
                font-weight: 500;
                color: gray
            }

            .sidebar .nav-link.active {
                color: #d4d4d4;
            }

            .sidebar-heading {
                font-size: 0.75rem;
            }

            .navbar-brand {
                padding-top: 0.75rem;
                padding-bottom: 0.75rem;
                background-color: rgba(0, 0, 0, 0.25);
                box-shadow: inset -1px 0 0 rgba(0, 0, 0, 0.25);
            }

            .navbar .form-control {
                padding: 0.75rem 1rem;
            }
        </style>

        <!-- Scripts -->
        @routes
        @viteReactRefresh
        @vite(['resources/js/app.jsx', "resources/js/Pages/{$page['component']}.jsx"])
        @inertiaHead
    </head>
    <body class="font-sans antialiased">
        @inertia
    </body>
</html>
