<script setup>
</script>

<template>
  <body class="signwrapper">

<div class="sign-overlay"></div>
<div class="signpanel"></div>

<div class="panel signin">
  <div class="panel-heading">
    <h1>TRIBUNAL-X</h1>
    <h4 class="panel-title">Bem-vindo! Por favor, faça login.</h4>
  </div>
  <div class="panel-body">
    <!-- <button class="btn btn-primary btn-quirk btn-fb btn-block">Connect with Facebook</button> -->
    <!-- <div class="or">or</div> -->
    <form action="index.html">
      <div class="form-group mb10">
        <div class="input-group">
          <span class="input-group-addon"><i class="material-icons">person</i></span>
          <input type="text" class="form-control" placeholder="Digite o seu nome">
        </div>
      </div>
      <div class="form-group nomargin">
        <div class="input-group">
          <span class="input-group-addon"><i class="material-icons">lock</i></span>
          <input type="text" class="form-control" placeholder="Digite a sua senha">
        </div>
      </div>
      <div><a href="" class="forgot">Esqueceu a sua senha ?</a></div>
      <div class="form-group">
        <RouterLink to="/home">
          <button class="btn btn-success btn-quirk btn-block">Entrar</button>
        </RouterLink>
      </div>
    </form>
    <hr class="invisible">
    <!-- <div class="form-group">
      <RouterLink to="#" class="btn btn-default btn-quirk btn-stroke btn-stroke-thin btn-block btn-sign">
        Not a member? Sign up now!
      </RouterLink>
    </div> -->
  </div>
</div><!-- panel -->

</body>
</template>
