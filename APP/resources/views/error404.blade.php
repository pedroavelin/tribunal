@extends('layouts.main_layout')
@section('content')
    <!-- Content -->
  <!-- Error -->
  <div class="container-xxl container-p-y">
    <div class="misc-wrapper">
      <h1 class="mb-2 mx-2" style="line-height: 6rem;font-size: 6rem;">404</h1>
      <h4 class="mb-2 mx-2">Página não encontrada ⚠️</h4>
      <p class="mb-6 mx-2">não conseguimos encontrar a página que você está procurando</p>
      <a href="{{ route('home')}}" class="btn btn-primary mb-10">ir para dashboard</a>
      <div class="mt-4">
        <img src="../../assets/img/illustrations/page-misc-error.png" alt="page-misc-error-light" width="225" class="img-fluid">
      </div>
    </div>
  </div>
  <div class="container-fluid misc-bg-wrapper">
    <img src="../../assets/img/illustrations/bg-shape-image-light.png" height="355" alt="page-misc-error" data-app-light-img="illustrations/bg-shape-image-light.png" data-app-dark-img="illustrations/bg-shape-image-dark.png">
  </div>
  <!-- /Error -->
  <!-- / Content -->

@endsection