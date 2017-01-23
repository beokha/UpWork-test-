using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace upwork_test_monitorChange_SignalR.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Changes()
        {
            return View();
        }

        public ActionResult DataContent()
        {
            return PartialView();
        }
    }
}