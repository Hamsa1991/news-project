<?php
    $isNewRecord = false;
    $action = 'update/'. $storeType->id;
if(!$storeType->exists) {
    $isNewRecord = true;
    $action = 'store';
}
?>
<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>New Item</title>

    <!-- Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&display=swap" rel="stylesheet">
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">

</head>
<body class="antialiased">
<form class="form" action="/store-types/{{$action}}" method="post" enctype="multipart/form-data">
    {{ csrf_field() }}
    <h2>New Store Type</h2>
    <div>
        @if (session()->has('message'))
            <div class="alert alert-success">
                {{ session('message') }}
            </div>
        @endif
    </div>
    <div class="form-group">
        <label for="exampleInputEmail1" class="form-label">Name</label>
        <input type="text" name="name" class="form-control" required placeholder="Name" value="{{$storeType->name}}">
    </div>
    <div class="form-group">
        <label for="exampleInputEmail1" class="form-label">Percentage</label>
        <div>
            <input type="number" name="percentage" class="form-control" min="0" required placeholder="Percentage" value="{{$storeType->percentage}}">
        </div>
    </div>

    <button type="submit" class="btn btn-primary">Save</button>
</form>

</body>

