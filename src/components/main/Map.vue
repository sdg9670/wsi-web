<template>
  <div id="map" style="height: 100%; width: 100%;"></div>
</template>

<script>
export default {
  data() {
    return {
      map: null,
      nowMarker: null,
      markerData: [],
      markerClustering: null,
    };
  },
  async created() {
    await this.loadScript();
    await this.getPlaces();
  },
  watch: {
    isShowSideBar(n) {
      if (n === false) {
        if (this.nowMarker.map) {
          this.nowMarker.setMap(null);
        }
      }
    },
    isNeedPlaceReload(n) {
      if (n) {
        this.getPlaces();
        this.isNeedPlaceReload = false;
      }
    },
  },
  methods: {
    // 장소 불러오기
    async getPlaces() {
      this.places = (await this.$axios.get('/place')).data;
      console.log(this.places);
      for (let i = 0; i < this.markerData.length; i++) {
        this.markerData[i].marker.setMap(null);
      }
      if (this.markerClustering) this.markerClustering.map = null;
      this.markerData = [];
      for (let i = 0; i < this.places.length; i++) {
        this.markerData.push(this.places[i].coord);
      }
      await this.loadMarker();
    },
    // 네이버 지도 API 로드
    async loadScript() {
      return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.setAttribute(
          'src',
          'https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=hc2kl7jrxd&submodules=geocoder'
        );
        script.async = true;
        script.onload = () => {
          this.map = new window.naver.maps.Map('map', {
            center: new window.naver.maps.LatLng(36, 127.874442),
            zoom: 8,
            zoomControl: true,
            zoomControlOptions: {
              position: window.naver.maps.Position.TOP_LEFT,
              style: window.naver.maps.ZoomControlStyle.SMALL,
            },
          });

          this.nowMarker = new window.naver.maps.Marker({
            icon: './images/marker-red.png',
          });

          window.naver.maps.Event.addListener(this.map, 'click', e => {
            window.naver.maps.Service.reverseGeocode(
              {
                coords: e.coord,
                orders: [
                  window.naver.maps.Service.OrderType.ADDR,
                  window.naver.maps.Service.OrderType.ROAD_ADDR,
                ].join(','),
              },
              (status, response) => {
                if (status !== window.naver.maps.Service.Status.OK) {
                  return reject();
                }

                let address = response.v2.address; // 검색 결과로 만든 주소

                window.naver.maps.Service.geocode(
                  {
                    address: address.jibunAddress || address.roadAddress,
                  },
                  (status, response) => {
                    if (status !== window.naver.maps.Service.Status.OK) {
                      return reject();
                    }

                    let result2 = response.result,
                      items2 = result2.items;

                    const position = new window.naver.maps.LatLng(
                      items2[0].point.y,
                      items2[0].point.x
                    );

                    if (!this.nowMarker.map && !this.isShowSideBar) {
                      if (this.map.zoom >= 19) {
                        this.map.panTo(position);
                      } else {
                        this.map.setCenter(position);
                        this.map.setZoom(19, true);
                      }
                    }

                    if (!this.nowMarker.map && !this.isShowSideBar) {
                      this.nowMarker.setMap(this.map);
                      this.nowMarker.setPosition(position);

                      this.selectedPlace = {
                        address: {
                          jibun: address.jibunAddress,
                          road: address.roadAddress,
                        },
                        coord: {
                          x: parseFloat(items2[0].point.x),
                          y: parseFloat(items2[0].point.y),
                        },
                      };

                      this.isShowSideBar = true;
                    } else {
                      this.nowMarker.setMap(null);
                      this.isShowSideBar = false;
                    }
                  }
                );
              }
            );
          });
          resolve();
        };
        document.head.appendChild(script);
      });
    },
    // 마커 등록 및 로드
    async loadMarker() {
      const markerHtml = {
        htmlMarker1: {
          content:
            '<div style="cursor:pointer;width:40px;height:40px;line-height:42px;font-size:10px;color:white;text-align:center;font-weight:bold;background:url(' +
            'https://navermaps.github.io/maps.js/docs' +
            '/img/cluster-marker-1.png);background-size:contain;"></div>',
          size: new window.naver.maps.Size(40, 40),
          anchor: new window.naver.maps.Point(20, 20),
        },
        htmlMarker2: {
          content:
            '<div style="cursor:pointer;width:40px;height:40px;line-height:42px;font-size:10px;color:white;text-align:center;font-weight:bold;background:url(' +
            'https://navermaps.github.io/maps.js/docs' +
            '/img/cluster-marker-2.png);background-size:contain;"></div>',
          size: new window.naver.maps.Size(40, 40),
          anchor: new window.naver.maps.Point(20, 20),
        },
        htmlMarker3: {
          content:
            '<div style="cursor:pointer;width:40px;height:40px;line-height:42px;font-size:10px;color:white;text-align:center;font-weight:bold;background:url(' +
            'https://navermaps.github.io/maps.js/docs' +
            '/img/cluster-marker-3.png);background-size:contain;"></div>',
          size: new window.naver.maps.Size(40, 40),
          anchor: new window.naver.maps.Point(20, 20),
        },
        htmlMarker4: {
          content:
            '<div style="cursor:pointer;width:40px;height:40px;line-height:42px;font-size:10px;color:white;text-align:center;font-weight:bold;background:url(' +
            'https://navermaps.github.io/maps.js/docs' +
            '/img/cluster-marker-4.png);background-size:contain;"></div>',
          size: new window.naver.maps.Size(40, 40),
          anchor: new window.naver.maps.Point(20, 20),
        },
        htmlMarker5: {
          content:
            '<div style="cursor:pointer;width:40px;height:40px;line-height:42px;font-size:10px;color:white;text-align:center;font-weight:bold;background:url(' +
            'https://navermaps.github.io/maps.js/docs' +
            '/img/cluster-marker-5.png);background-size:contain;"></div>',
          size: new window.naver.maps.Size(40, 40),
          anchor: new window.naver.maps.Point(20, 20),
        },
      };

      const MarkerClustering = (await import('@/utils/MarkerClustering'))
        .default;

      console.log(this.markerData);

      let markers = [];
      for (let i = 0; i < this.markerData.length; i++) {
        this.markerData[i].marker = new window.naver.maps.Marker({
          icon: './images/marker-default.png',
          position: new window.naver.maps.LatLng(
            this.markerData[i].y,
            this.markerData[i].x
          ),
        });

        window.naver.maps.Event.addListener(
          this.markerData[i].marker,
          'click',
          async () => {
            if (this.nowMarker.map) {
              this.nowMarker.setMap(null);
              this.isShowSideBar = false;
            }
            if (
              this.selectedPlace &&
              this.isShowSideBar &&
              this.selectedPlace.coord.x === this.places[i].coord.x &&
              this.selectedPlace.coord.y === this.places[i].coord.y
            )
              return;
            this.selectedPlace = this.places[i];
            if (this.isShowSideBar) {
              await this.$store.dispatch('main/getPlaceOne');
              console.log('흐헵');
            } else this.isShowSideBar = true;
          }
        );
        markers.push(this.markerData[i].marker);
      }

      this.markerClustering = new MarkerClustering({
        minClusterSize: 2,
        maxZoom: 14,
        map: this.map,
        markers: markers,
        disableClickZoom: false,
        gridSize: 120,
        icons: [
          markerHtml.htmlMarker1,
          markerHtml.htmlMarker2,
          markerHtml.htmlMarker3,
          markerHtml.htmlMarker4,
          markerHtml.htmlMarker5,
        ],
        indexGenerator: [5, 10, 25, 50, 100],
        stylingFunction: function(clusterMarker, count) {
          clusterMarker
            .getElement()
            .querySelector('div:first-child').innerHTML = count;
        },
      });
    },
  },
  computed: {
    isShowSideBar: {
      get() {
        return this.$store.state.main.isShowSideBar;
      },
      set(value) {
        this.$store.commit('main/setIsShowSideBar', value);
      },
    },
    selectedPlace: {
      get() {
        return this.$store.state.main.selectedPlace;
      },
      set(value) {
        this.$store.commit('main/setSelectedPlace', value);
      },
    },
    places: {
      get() {
        return this.$store.state.main.places;
      },
      set(value) {
        this.$store.commit('main/setPlaces', value);
      },
    },
    isNeedPlaceReload: {
      get() {
        return this.$store.state.main.isNeedPlaceReload;
      },
      set(value) {
        this.$store.commit('main/setIsNeedPlaceReload', value);
      },
    },
  },
};
</script>

<style></style>
