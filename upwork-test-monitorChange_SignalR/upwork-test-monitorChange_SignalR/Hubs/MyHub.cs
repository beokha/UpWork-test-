using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.SignalR;
using System.Web.Mvc;
using System.Data.Entity;
using upwork_test_monitorChange_SignalR.DAL;

namespace upwork_test_monitorChange_SignalR.Hubs
{
    public class MyHub : Hub
    {
        private IDevTestRepository devTestRepository;
        public MyHub() // create a new context instance
        {
            this.devTestRepository = new DevTestRepository(new test_monitorChangesEntities());
        }
        public MyHub(IDevTestRepository devTestRepository) // allow constructor to pass in a context instance
        {
            this.devTestRepository = devTestRepository;
        }

        //private test_monitorChangesEntities db = new test_monitorChangesEntities();

        // GET: All existing row in db
        public void getDataFromTable(string Page)
        {
            Clients.All.gettingData(devTestRepository.GetElements());

            if(Page == "Changes") // if page "change" we should say it to our js
            {
                isReadyForNextStep();
            }
        }

        private void isReadyForNextStep()
        {
            Clients.All.toTheNextStep();
        }

        
        public void Inserting(string CampaignName, DateTime? date, int? Clicks, int? Conversatioion, int? Impressions, string AffiliateName) //, 
        {
            if(date == null)
            {
                date = DateTime.Now;
            }

            DevTest newData = new DevTest()
            {
                CampaignName = CampaignName,
                date = date,
                Clicks = Clicks,
                Conversatioion = Conversatioion,
                Impressions = Impressions,
                AffiliateName = AffiliateName
            };

            devTestRepository.InsertElement(newData);
            devTestRepository.Save();

            //db.DevTest.Add(newData);
            //db.SaveChanges();

            Clients.All.afterInserting(newData);
        }

        public void deleting(int id)
        {
            //DevTest itemToRemove = db.DevTest.Where(p => p.id == id).FirstOrDefault(); // What we will remove
            //db.DevTest.Remove(itemToRemove);
            //db.SaveChanges();

            DevTest itemToRemove = devTestRepository.GetElementsByID(id);
            devTestRepository.DeleteElement(id);
            devTestRepository.Save();

            Clients.All.afterDeleting(itemToRemove);
        }

        public void changing(int id, string CampaignName, DateTime? date, int? Clicks, int? Conversatioion, int? Impressions, string AffiliateName)
        {
            if (date == null)
            {
                date = DateTime.Now;
            }

            //DevTest itemToChange = db.DevTest.Where(p => p.id == id).FirstOrDefault(); // What change
            DevTest ChangedItem = new DevTest()
            {
                id = id,
                CampaignName = CampaignName,
                date = date,
                Clicks = Clicks,
                Conversatioion = Conversatioion,
                Impressions = Impressions,
                AffiliateName = AffiliateName
            }; // What should be

            devTestRepository.UpdateElement(ChangedItem);
            devTestRepository.Save();

            //db.DevTest.Attach(ChangedItem);
            //db.Entry(ChangedItem).State = EntityState.Modified; 
            //db.SaveChanges();


            Clients.All.afterChanging(id,ChangedItem);
        }

        protected override void Dispose(bool disposing)
        {
            devTestRepository.Dispose();
            base.Dispose(disposing);
        }
    }
}