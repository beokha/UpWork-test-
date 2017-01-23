using System.Web;
using System.Web.Mvc;

namespace upwork_test_monitorChange_SignalR
{
    public class FilterConfig
    {
        public static void RegisterGlobalFilters(GlobalFilterCollection filters)
        {
            filters.Add(new HandleErrorAttribute());
        }
    }
}
