<script setup>
    import HeaderComponent from '@/components/HeaderComponent.vue';
    import LeftpanelComponent from '@/components/LeftpanelComponent.vue';
    import AddProComponent from '@/components/processo/AddProComponent.vue'
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
          <label class="">
            <button class="btn btn-success" data-toggle="modal" data-target="#myModal">
                Novo Processo
              </button>
          </label>
        </div>
      </div>

      <div class="row filemanager">

        <div class="col-xs-4 col-sm-2 col-md-2 col-lg-2 image" v-for="i in 12   " :key="i">
          <div class="thmb">
            <label class="ckbox">
              <input type="checkbox"><span></span>
            </label>
            <div class="btn-group fm-group">
              <button type="button" class="btn btn-default dropdown-toggle fm-toggle" data-toggle="dropdown">
                <span class="caret"></span>
              </button>
              <ul class="dropdown-menu pull-right fm-menu" role="menu">
                <li><a href="#"><i class="fa fa-share"></i> Share</a></li>
                <li><a href="#"><i class="fa fa-pencil"></i> Edit</a></li>
                <li><a href="#"><i class="fa fa-download"></i> Download</a></li>
                <li><a href="#"><i class="fa fa-trash-o"></i> Delete</a></li>
              </ul>
            </div><!-- btn-group -->
            <div class="thmb-prev">
              <a href="">
                <img src="@/assets/images/documents.png" class="img-responsive" alt="" />
              </a>
            </div>
            <h5 class="fm-title"><a href="">11/2025</a></h5>
            <!-- <small class="text-muted">Added: June 30, 2015</small> -->
          </div><!-- thmb -->
        </div><!-- col-xs-6 -->
      </div><!-- row -->
    </div><!-- col-sm-9 -->

  </div>
</div>

</div><!-- mainpanel -->

<!--Start  Modal-add-processo -->
<AddProComponent/>
<!--End Modal-add-processo -->
</section>
</template>