<template>
  <div class="statistics">
    <h3>信息概览</h3>
    <div class="card-wrap">
      <div class="box-card">
        <div class="card-header">在校学生</div>
        <div class="card-body">{{ studentCount }}</div>
      </div>
      <div class="box-card">
        <div class="card-header">学院数量</div>
        <div class="card-body">{{ collegeCount }}</div>
      </div>
    </div>
    <div class="chart-wrap">
      <div class="chart-item" ref="provinceChart"></div>
      <div class="chart-item" ref="collegeChart"></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      collegeCount: '',
      studentCount: '',
      collegeData: '',
      provinceData: '',
      provinceChart: null
    }
  },
  computed: {
    provinceOption() {
      return {
        title: {
          text: '地域分布',
          left: 'left'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{b} : {c} 人'
        },
        label: {
          normal: {
            show: false
          },
          emphasis: {
            show: false
          }
        },
        visualMap: {
          min: 0,
          max: 1000,
          left: 0,
          top: 30,
          showLabel: !0,
          text: ['高', '低'],
          pieces: [
            {
              gt: 400,
              label: '> 400 人',
              color: '#1e50a2'
            },
            {
              gte: 200,
              lte: 400,
              label: '200 - 400 人',
              color: '#007bbb'
            },
            {
              gte: 100,
              lte: 200,
              label: '100 - 200 人',
              color: '#2ca9e1'
            },
            {
              gte: 50,
              lt: 100,
              label: '50 - 100 人',
              color: '#89c3eb'
            },
            {
              gte: 0,
              lt: 50,
              label: '< 50',
              color: '#a0d8ef'
            }
          ],
          show: !0
        },
        // visualMap: {
        //   show: true,
        //   right: 0,
        //   bottom: '10px',
        //   min: 0,
        //   max: 500,
        //   inRange: {
        //     color: '#3573da',
        //     colorLightness: [0.6, 0.2]
        //   }
        // },
        geo: {
          right: 0,
          bottom: 0,
          map: 'china',
          roam: !1,
          scaleLimit: {
            min: 1,
            max: 2
          },
          zoom: 1.3,
          label: {
            normal: {
              show: false,
              fontSize: '14',
              color: 'rgba(0,0,0,0.7)'
            }
          },
          itemStyle: {
            normal: {
              borderColor: '#a0d8ef'
            },
            emphasis: {
              color: '#1e50a2',
              areaColor: '#c1e4e9',
              shadowOffsetX: 0,
              shadowOffsetY: 0,
              borderWidth: 1
            }
          }
        },
        series: [
          {
            name: '学生人数',
            type: 'map',
            geoIndex: 0,
            data: this.provinceData
          }
        ]
      }
    },
    collegeOption() {
      return {
        title: {
          text: '学院分布',
          left: 'left'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{b} : {c} 人'
        },
        visualMap: {
          show: false,
          right: 'right',
          bottom: '10px',
          min: 50,
          max: 1000,
          inRange: {
            color: '#3573da',
            colorLightness: [0.2, 0.6]
          }
        },
        series: [
          
          {
            name: 'Tag',
            type: 'pie',
            radius: ['20%', '70%'],
            center: ['50%', '50%'],
            data: this.collegeData.sort((a, b) => b.value - a.value),
            roseType: 'radius',
            label: {
              color: '#4a4a4a'
            },
            labelLine: {
              lineStyle: {
                color: '#4a4a4a'
              },
              smooth: 0.2,
              length: 10,
              length2: 20
            },
            animationType: 'scale',
            animationEasing: 'elasticOut',
            animationDelay: function(idx) {
              return Math.random() * 500
            }
          }
        ]
      }
    }
  },
  created() {
    this.$request({
      url: '/students/statistics'
    }).then(res => {
      if (res.code === 200) {
        this.collegeCount = res.collegeCount
        this.studentCount = res.studentCount
        this.collegeData = res.collegeData
        this.provinceData = res.provinceData
      }
    })
  },
  mounted() {},
  watch: {
    provinceData() {
      this.provinceChart = this.$echarts.init(this.$refs.provinceChart)
      this.provinceChart.setOption(this.provinceOption)
    },
    collegeData() {
      this.collegeChart = this.$echarts.init(this.$refs.collegeChart)
      this.collegeChart.setOption(this.collegeOption)
    }
  }
}
</script>

<style>
.statistics .card-wrap {
  display: flex;
  margin-top: 20px;
}

.statistics .box-card {
  padding: 15px 30px;
  margin-right: 20px;
  border: 1px solid #dcdfe6;
}

.statistics .card-header {
  font-size: 14px;
  color: #7a7a7a;
}

.statistics .card-body {
  margin-top: 10px;
  font-size: 18px;
  font-weight: bold;
  color: var(--themeColor);
}

.chart-wrap {
  display: flex;
  width: 100%;
  overflow: hidden;
  margin-top: 20px;
}

.chart-item {
  width: calc(50% - 10px);
  height: calc(100vh - 250px);
}
</style>
