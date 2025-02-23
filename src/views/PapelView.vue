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
            <input class="form-control input-sm" type="text" placeholder="Pesquisar processo...">
          </div>
          <div class="btn-group" role="group">
            
          </div>
        </div><!-- btn-toolbar -->

        <div class="btn-group pull-right" data-toggle="buttons">
          <label class="btn btn-default-active active">
            <input type="checkbox" checked> Todos
          </label>
          <label class="btn btn-default-active">
            <input type="checkbox"> Reu Preso
          </label>
          <label class="btn btn-default-active">
            <input type="checkbox"> Réu solto
          </label>
          <label class="btn btn-default-active">
            <input type="checkbox"> Novo papel
          </label>
        </div>
      </div>

      <div class="row">
          <div class="col-sm-4 col-md-3 col-lg-2">
            <div class="profile-left mb20">
              <div class="profile-left-heading">
                <h6 class="profile-name">Juíz</h6>
                <!-- <h6 class="profile-designation">Software Engineer</h6> -->

                <ul class="list-group">
                  <li class="list-group-item">Permissões <a href="timeline.html">18</a></li>
                </ul>
                <button class="btn btn-danger btn-sm btn-quirk btn-block profile-btn-follow">Adicionar permisões</button>
              </div>
            </div><!-- profile-left -->
          </div><!-- col-sm-4 -->
          <div class="col-sm-4 col-md-3 col-lg-2">
            <div class="profile-left mb20">
              <div class="profile-left-heading">
                <h6 class="profile-name">Secretário judicial</h6>
                <!-- <h6 class="profile-designation">Software Engineer</h6> -->

                <ul class="list-group">
                  <li class="list-group-item">Permissões <a href="timeline.html">18</a></li>
                </ul>
                <button class="btn btn-danger btn-sm btn-quirk btn-block profile-btn-follow">Adicionar permisões</button>
              </div>
            </div><!-- profile-left -->
          </div><!-- col-sm-4 -->
          <div class="col-sm-4 col-md-3 col-lg-2">
            <div class="profile-left mb20">
              <div class="profile-left-heading">
                <h6 class="profile-name">Escrivã de direito de 1º classe</h6>
                <!-- <h6 class="profile-designation">Software Engineer</h6> -->

                <ul class="list-group">
                  <li class="list-group-item">Permissões <a href="timeline.html">18</a></li>
                </ul>
                <button class="btn btn-danger btn-sm btn-quirk btn-block profile-btn-follow">Adicionar permisões</button>
              </div>
            </div><!-- profile-left -->
          </div><!-- col-sm-4 -->
          <div class="col-sm-4 col-md-3 col-lg-2">
            <div class="profile-left mb20">
              <div class="profile-left-heading">
                <h6 class="profile-name">Escrivã de direito de 2º classe</h6>
                <!-- <h6 class="profile-designation">Software Engineer</h6> -->

                <ul class="list-group">
                  <li class="list-group-item">Permissões <a href="timeline.html">18</a></li>
                </ul>
                <button class="btn btn-danger btn-sm btn-quirk btn-block profile-btn-follow">Adicionar permisões</button>
              </div>
            </div><!-- profile-left -->
          </div><!-- col-sm-4 -->
          <div class="col-sm-4 col-md-3 col-lg-2">
            <div class="profile-left mb20">
              <div class="profile-left-heading">
                <h6 class="profile-name">Escrivã de direito de 3º classe</h6>
                <!-- <h6 class="profile-designation">Software Engineer</h6> -->

                <ul class="list-group">
                  <li class="list-group-item">Permissões <a href="timeline.html">18</a></li>
                </ul>
                <button class="btn btn-danger btn-sm btn-quirk btn-block profile-btn-follow">Adicionar permisões</button>
              </div>
            </div><!-- profile-left -->
          </div><!-- col-sm-4 -->
          <div class="col-sm-4 col-md-3 col-lg-2">
            <div class="profile-left mb20">
              <div class="profile-left-heading">
                <h6 class="profile-name">Escrivã de direito de 1º classe</h6>
                <!-- <h6 class="profile-designation">Software Engineer</h6> -->

                <ul class="list-group">
                  <li class="list-group-item">Permissões <a href="timeline.html">18</a></li>
                </ul>
                <button class="btn btn-danger btn-sm btn-quirk btn-block profile-btn-follow">Adicionar permisões</button>
              </div>
            </div><!-- profile-left -->
          </div><!-- col-sm-4 -->
          <div class="col-sm-4 col-md-3 col-lg-2">
            <div class="profile-left mb20">
              <div class="profile-left-heading">
                <h6 class="profile-name">Ajudante de escrivã de 2º classe</h6>
                <!-- <h6 class="profile-designation">Software Engineer</h6> -->

                <ul class="list-group">
                  <li class="list-group-item">Permissões <a href="timeline.html">18</a></li>
                </ul>
                <button class="btn btn-danger btn-sm btn-quirk btn-block profile-btn-follow">Adicionar permisões</button>
              </div>
            </div><!-- profile-left -->
          </div><!-- col-sm-4 -->
          <div class="col-sm-4 col-md-3 col-lg-2">
            <div class="profile-left mb20">
              <div class="profile-left-heading">
                <h6 class="profile-name">Ajudante de escrivã 3º classe</h6>
                <!-- <h6 class="profile-designation">Software Engineer</h6> -->

                <ul class="list-group">
                  <li class="list-group-item">Permissões <a href="timeline.html">18</a></li>
                </ul>
                <button class="btn btn-danger btn-sm btn-quirk btn-block profile-btn-follow">Adicionar permisões</button>
              </div>
            </div><!-- profile-left -->
          </div><!-- col-sm-4 -->
          <div class="col-sm-4 col-md-3 col-lg-2">
            <div class="profile-left mb20">
              <div class="profile-left-heading">
                <h6 class="profile-name">Oficial de Diligência Principal</h6>
                <!-- <h6 class="profile-designation">Software Engineer</h6> -->

                <ul class="list-group">
                  <li class="list-group-item">Permissões <a href="timeline.html">18</a></li>
                </ul>
                <button class="btn btn-danger btn-sm btn-quirk btn-block profile-btn-follow">Adicionar permisões</button>
              </div>
            </div><!-- profile-left -->
          </div><!-- col-sm-4 -->
          <div class="col-sm-4 col-md-3 col-lg-2">
            <div class="profile-left mb20">
              <div class="profile-left-heading">
                <h6 class="profile-name">Oficial de Diligência de 1º classe</h6>
                <!-- <h6 class="profile-designation">Software Engineer</h6> -->

                <ul class="list-group">
                  <li class="list-group-item">Permissões <a href="timeline.html">18</a></li>
                </ul>
                <button class="btn btn-danger btn-sm btn-quirk btn-block profile-btn-follow">Adicionar permisões</button>
              </div>
            </div><!-- profile-left -->
          </div><!-- col-sm-4 -->
          <div class="col-sm-4 col-md-3 col-lg-2">
            <div class="profile-left mb20">
              <div class="profile-left-heading">
                <h6 class="profile-name">Oficial de Diligência 2º classe</h6>
                <!-- <h6 class="profile-designation">Software Engineer</h6> -->

                <ul class="list-group">
                  <li class="list-group-item">Permissões <a href="timeline.html">18</a></li>
                </ul>
                <button class="btn btn-danger btn-sm btn-quirk btn-block profile-btn-follow">Adicionar permisões</button>
              </div>
            </div><!-- profile-left -->
          </div><!-- col-sm-4 -->

        </div><!-- row -->
    </div><!-- col-sm-9 -->

  </div>
</div>

</div><!-- mainpanel -->

</section>
</template>

<style scoped>
h6.profile-name{
  font-size:1.4rem;
}
</style>