<script setup>
import HeaderComponent from '@/components/HeaderComponent.vue';
import LeftpanelComponent from '@/components/LeftpanelComponent.vue';
</script>
<template>
  <HeaderComponent/>
<section>
<LeftpanelComponent/>
<div class="mainpanel">

  <!--<div class="pageheader">
    <h2><i class="fa fa-home"></i> Dashboard</h2>
  </div>-->

  <div class="contentpanel">

    <div class="row">
      <div class="col-md-9 col-lg-8 dash-left">
       
        <div class="row panel-statistics">
          <div class="col-sm-4">
            <div class="panel panel-updates">
              <div class="panel-body">
                <div class="row">
                  <div class="col-xs-12 col-lg-12">
                    <h4 class="panel-title text-success">Total de processos</h4>
                    <h3>100</h3>
                    <div class="progress">
                      <div style="width: 100%" aria-valuemax="100" aria-valuemin="0" aria-valuenow="75.7" role="progressbar" class="progress-bar progress-bar-success">
                        <span class="sr-only">75.7% Complete (success)</span>
                      </div>
                    </div>
                    <p>Added products for this month: 75</p>
                  </div>
                  <div class="col-xs-5 col-lg-4 text-right">
                    <input type="text" value="75" class="dial-success">
                  </div>
                </div>
              </div>
            </div><!-- panel -->
          </div><!-- col-sm-6 -->

          <div class="col-sm-4">
            <div class="panel panel-danger-full panel-updates">
              <div class="panel-body">
                <div class="row">
                  <div class="col-xs-12 col-lg-12">
                    <h4 class="panel-title text-warning">Processos de Réu Preso</h4>
                    <h3>50</h3>
                    <div class="progress">
                      <div style="width: 50%" aria-valuemax="100" aria-valuemin="0" aria-valuenow="39.9" role="progressbar" class="progress-bar progress-bar-warning">
                        <span class="sr-only">39.9% Complete (success)</span>
                      </div>
                    </div>
                    <p>Rejected products for this month: 45</p>
                  </div>
                  <div class="col-xs-5 col-lg-4 text-right">
                    <input type="text" value="45" class="dial-warning">
                  </div>
                </div>
              </div>
            </div><!-- panel -->
          </div><!-- col-sm-6 -->

          <div class="col-sm-4">
            <div class="panel panel-success-full panel-updates">
              <div class="panel-body">
                <div class="row">
                  <div class="col-xs-12 col-lg-12">
                    <h4 class="panel-title text-success">Processos de Réu Solto</h4>
                    <h3>50</h3>
                    <div class="progress">
                      <div style="width: 50%" aria-valuemax="100" aria-valuemin="0" aria-valuenow="55.4" role="progressbar" class="progress-bar progress-bar-info">
                        <span class="sr-only">55.4% Complete (success)</span>
                      </div>
                    </div>
                    <p>Sold products for this month: 1,203</p>
                  </div>
                  <div class="col-xs-5 col-lg-4 text-right">
                    <input type="text" value="55" class="dial-info">
                  </div>
                </div>
              </div>
            </div><!-- panel -->
          </div><!-- col-sm-6 -->

          <div class="col-sm-6" style="display:none">
            <div class="panel panel-updates">
              <div class="panel-body">
                <div class="row">
                  <div class="col-xs-12 col-lg-12">
                    <h4 class="panel-title text-danger">Products Returned</h4>
                    <h3>22</h3>
                    <div class="progress">
                      <div style="width: 22.1%" aria-valuemax="100" aria-valuemin="0" aria-valuenow="22.1" role="progressbar" class="progress-bar progress-bar-danger">
                        <span class="sr-only">22.1% Complete (success)</span>
                      </div>
                    </div>
                    <p>Returned products this month: 22</p>
                  </div>
                  <div class="col-xs-5 col-lg-4 text-right">
                    <input type="text" value="22" class="dial-danger">
                  </div>
                </div>
              </div>
            </div><!-- panel -->
          </div><!-- col-sm-6 -->

        </div><!-- row -->
      </div><!-- col-md-9 -->
      <div class="col-md-3 col-lg-4 dash-right">
      
        <div class="row">
          <div class="col-sm-5 col-md-12 col-lg-6">
            <div class="panel panel-inverse">
              <div class="panel-heading">
                <h4 class="panel-title">Integrantes da letra</h4>
              </div>
              <div class="panel-body">
                <ul class="media-list user-list">
                  <li class="media" v-for="i in 4" key="i">
                    <div class="media-left">
                      <a href="#">
                        <img class="media-object img-circle" src="@/assets/images/avatar.png" alt="">
                      </a>
                    </div>
                    <div class="media-body">
                      <h4 class="media-heading"><a href=""> Drº. Pedro Epalanga</a></h4>
                      <span>{{i }}</span> Processos
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div><!-- row -->

      </div><!-- col-md-3 -->
    </div><!-- row -->

  </div><!-- contentpanel -->

</div><!-- mainpanel -->

</section>
</template>
<style>
.text-right{
  display:none;
}
</style>