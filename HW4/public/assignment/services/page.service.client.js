/**
 * Created by Amardeep on 15/10/16.
 */
(function () {
    angular
        .module("WebAppMaker")
        .factory("PageService",PageService);


    function PageService($http) {
        var api ={
            createPage:createPage,
            findPageByWebsiteId:findPageByWebsiteId,
            findPageById:findPageById,
            updatePage:updatePage,
            deletePage:deletePage
        }
        return api;
        function createPage(websiteId, page) {
            var temp=new Date().getTime()+"";
            page._id=temp.substr(temp.length-4);
            page.websiteId=websiteId;
            var url="/api/website/"+websiteId +"/page";
            return $http.post(url,page);

        }
        function findPageByWebsiteId(websiteId) {
            var url="/api/website/"+websiteId +"/page";
            return $http.get(url);
            // var result= [];
            // for (var w in pages){
            //     if(pages[w].websiteId===websiteId){
            //         result.push(pages[w]);
            //     }
            // }
            // return result;
        }
        function findPageById(pageId) {
            var url="/api/page/" + pageId;
            return $http.get(url);
            // for (var w in pages){
            //     if(pages[w]._id===pageId){
            //         return pages[w]
            //     }
            // }
            // return null;
        }
        function updatePage(pageId, page) {
            var url="/api/page/" + pageId;
            return $http.put(url,page);
            // for(var i in pages){
            //     if(pages[i]._id === pageId){
            //         pages[i].name = page.name;
            //         pages[i].title=page.title;
            //         return true;
            //     }
            // }
            // return false;
        }
        function deletePage(pageId) {
            var url="/api/page/" + pageId;
            return $http.delete(url);
            // for (var w in pages){
            //     if(pages[w]._id===pageId){
            //         pages.splice(w,1);
            //         return true;
            //     }
            // }
            // return false;
        }
    }
})();
