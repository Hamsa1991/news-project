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
<form class="form" action="/item/store" method="post" enctype="multipart/form-data">
    {{ csrf_field() }}
    <h2>New Item</h2>
    <div>
        @if (session()->has('message'))
            <div class="alert alert-success">
                {{ session('message') }}
            </div>
        @endif
    </div>
    <div class="form-group">
        <label for="exampleInputEmail1" class="form-label">Name</label>
        <input type="text" name="name" class="form-control" required placeholder="Name">
    </div>
    <div class="form-group">
        <label for="exampleInputPassword1" class="form-label">Image</label>
        <input type="file" name="image" class="form-control" required>
    </div>
    <div class="form-group">
        <label for="exampleInputEmail1" class="form-label">Initial Price</label>
        <div>
            <input type="number" name="initial_price" class="form-control" min="0" required placeholder="Initial price" width="80%" >
            <label class="form-label">USD</label>
        </div>
    </div>
    @if(!empty($storeTypes))
        <div class="form-group form-check">
            <label for="exampleInputPassword1" class="form-label">Store Type</label>
            <select id="store_type" class="form-control" id="exampleInputPassword1" onchange="getStores()" required>
                <option value=""> -- Please Select --</option>
                @foreach($storeTypes as $storeType)
                    <option value="{{$storeType->id}}">{{ $storeType->name }}</option>
                @endforeach
            </select>
        </div>
    @endif

    <div class="form-group form-check">
        <label for="exampleInputPassword1" class="form-label">Store</label>
        <select name="store_id" id="stores" class="form-control stores-select" id="exampleInputPassword1" disabled required>
            <option value=""> -- Please Select --</option>
        </select>
    </div>

    <button type="submit" class="btn btn-primary">Save</button>
</form>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
<script src="{{asset('js/helper.js')}}"></script>

</body>
