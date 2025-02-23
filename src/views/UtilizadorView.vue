<script setup>
    import HeaderComponent from '@/components/HeaderComponent.vue';
    import LeftpanelComponent from '@/components/LeftpanelComponent.vue';
    
</script>
<template>
     <HeaderComponent/>
     <LeftpanelComponent/>
    <section>

<div class="mainpanel">

  <div class="contentpanel">

    <!-- <ol class="breadcrumb breadcrumb-quirk">
      <li><a href="index.html"><i class="fa fa-home mr5"></i> Home</a></li>
      <li><a href="buttons.html">Pages</a></li>
      <li class="active">Asset Manager</li>
    </ol> -->


  <div class="row">
    <div class="col-sm-12 col-md-12 col-lg-12 ">
      <div class="well well-asset-options clearfix">
        <div class="btn-toolbar btn-toolbar-media-manager pull-left" role="toolbar">
          <div class="btn-group" role="group">
            <input class="form-control input-sm" type="text" placeholder="Pesquisar utilizador...">
          </div>
          <div class="btn-group" role="group">
            
          </div>
        </div><!-- btn-toolbar -->

        <div class="btn-group pull-right" data-toggle="buttons">
          <label class="btn btn-default-active active">
            <input type="checkbox" checked> Todos
          </label>
          <label class="btn btn-default-active">
            <input type="checkbox"> Activo
          </label>
          <label class="btn btn-default-active">
            <input type="checkbox"> Inativo
          </label>
          <label class="btn btn-default-active">
            <input type="checkbox"> Novo utilizador
          </label>
        </div>
      </div>


        <div class="panel panel-inverse">
              <div class="panel-heading">
                <h4 class="panel-title">Lista de utilizadores [Letra CA]</h4>
              </div>
              <div class="panel-body">
                <ul class="media-list user-list">
                  <li class="media">
                    <div class="media-left">
                      <a href="#">
                        <img class="media-object img-circle" src="@/assets/images/avatar.png" alt="">
                      </a>
                    </div>
                    <div class="media-body">
                      <h4 class="media-heading nomargin"><a href="">Drº. Ismael Ngunza Fernando</a></h4>
                      Secretário judicial 
                      <small class="date"><i class="glyphicon glyphicon-time"></i> Just now</small>
                    </div>
                  </li>
                  <li class="media">
                    <div class="media-left">
                      <a href="#">
                        <img class="media-object img-circle" src="@/assets/images/avatar.png" alt="">
                      </a>
                    </div>
                    <div class="media-body">
                      <h4 class="media-heading nomargin"><a href="">Drº. Diana da Costa</a></h4>
                      Escrivã de direito de 1ª 
                      <small class="date"><i class="glyphicon glyphicon-time"></i> Yesterday</small>
                    </div>
                  </li>
                  <li class="media">
                    <div class="media-left">
                      <a href="#">
                        <img class="media-object img-circle" src="@/assets/images/avatar.png" alt="">
                      </a>
                    </div>
                    <div class="media-body">
                      <h4 class="media-heading nomargin"><a href="">Drº. Osório Ferreira Bastos Palhais</a></h4>
                      Oficial de deligências de 1ª
                      <small class="date"><i class="glyphicon glyphicon-time"></i> June 25, 2015</small>
                    </div>
                  </li>
                  <li class="media">
                    <div class="media-left">
                      <a href="#">
                        <img class="media-object img-circle" src="@/assets/images/avatar.png" alt="">
                      </a>
                    </div>
                    <div class="media-body">
                      <h4 class="media-heading nomargin"><a href="">Drº. Leila Fieta</a></h4>
                      Ajudante de Escrivã de 1ª
                      <small class="date"><i class="glyphicon glyphicon-time"></i> June 24, 2015</small>
                    </div>
                  </li>
                </ul>
              </div>
            </div><!-- panel -->
      </div><!-- row -->

  </div>
</div>

</div><!-- mainpanel -->

</section>
</template>