<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>Store Types</title>

    <!-- Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&display=swap" rel="stylesheet">
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">

</head>
<body>
<div>
    @if (session()->has('message'))
        <div class="alert alert-success">
            {{ session('message') }}
        </div>
    @endif
</div>
    @if($storeTypes)
        <div style="display: table;margin: 0 auto">
            <h2>Store Types</h2>
            <a href="/store-types/create">New Store Type</a>
        </div>

        <table class="table">
            <th>
                <tr>
                    <td>Name</td>
                    <td>Percentage</td>
                    <td></td>
                </tr>
            </th>
        @foreach($storeTypes as $storeType)
            <tr>
                <td>{{$storeType->name}}</td>
                <td>{{$storeType->percentage}}</td>
                <td><a href="/store-types/edit/{{$storeType->id}}">Edit</a></td>
            </tr>
        @endforeach
        </table>
    @endif
</body>
</html>
