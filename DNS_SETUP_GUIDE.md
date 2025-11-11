# DNS Configuration Guide for Hostinger

## Overview

This guide walks you through updating your DNS settings on Hostinger to point your domain (ajfsindia.com) to your new Google Cloud Run deployment.

## Important Notes

⚠️ **Before You Begin:**
- Have your Cloud Run URLs ready (both frontend and backend)
- Backup your current DNS settings (take screenshots)
- Understand that DNS changes can take 15 minutes to 48 hours to propagate
- Your old WordPress site will become inaccessible once DNS changes propagate

## Step-by-Step DNS Configuration

### Step 1: Get DNS Records from Google Cloud

After deploying your frontend and setting up domain mapping, Google Cloud will provide DNS records. To get them:

```bash
gcloud run domain-mappings describe \
  --service ajfs-frontend \
  --domain www.ajfsindia.com \
  --region us-central1
```

You should receive records similar to:

```
Record type    Name    Value
-----------    ----    -----
CNAME          www     ghs.googlehosted.com.
A              @       216.239.32.21
A              @       216.239.34.21
A              @       216.239.36.21
A              @       216.239.38.21
```

### Step 2: Access Hostinger DNS Management

1. Log in to [Hostinger Control Panel](https://hpanel.hostinger.com/)
2. Navigate to **Domains**
3. Find and click on **ajfsindia.com**
4. Click on **DNS / Name Servers**
5. You should see the DNS Zone Editor

### Step 3: Backup Current DNS Records

**IMPORTANT:** Before making any changes:

1. Take screenshots of all current DNS records
2. Note down all A records, CNAME records, and MX records
3. Save this information in a safe place

### Step 4: Remove Old WordPress Records

1. Find all **A records** pointing to your old WordPress hosting IP
2. These typically look like:
   ```
   Type: A
   Name: @ (or blank)
   Value: XXX.XXX.XXX.XXX (old IP)
   ```
3. Delete these old A records
4. If there's a CNAME record for `www`, delete it as well

**Keep these records:**
- MX records (for email)
- TXT records (for verification)
- Any other records not related to website hosting

### Step 5: Add New Google Cloud Records

#### Add CNAME Record for www

1. Click **Add Record** or **+ Add New Record**
2. Select record type: **CNAME**
3. Fill in:
   - **Name:** `www`
   - **Target/Value:** `ghs.googlehosted.com.` (note the trailing dot)
   - **TTL:** `3600` (1 hour)
4. Click **Save** or **Add Record**

#### Add A Records for Root Domain

You need to add **4 A records** for the root domain (@):

**First A Record:**
1. Click **Add Record**
2. Select record type: **A**
3. Fill in:
   - **Name:** `@` (or leave blank if Hostinger uses @ for root)
   - **Value:** `216.239.32.21`
   - **TTL:** `3600`
4. Click **Save**

**Second A Record:**
1. Click **Add Record**
2. Select record type: **A**
3. Fill in:
   - **Name:** `@`
   - **Value:** `216.239.34.21`
   - **TTL:** `3600`
4. Click **Save**

**Third A Record:**
1. Click **Add Record**
2. Select record type: **A**
3. Fill in:
   - **Name:** `@`
   - **Value:** `216.239.36.21`
   - **TTL:** `3600`
4. Click **Save**

**Fourth A Record:**
1. Click **Add Record**
2. Select record type: **A**
3. Fill in:
   - **Name:** `@`
   - **Value:** `216.239.38.21`
   - **TTL:** `3600`
4. Click **Save**

### Step 6: Verify Your Configuration

After adding all records, your DNS zone should look similar to this:

```
Type    Name    Value                       TTL
----    ----    -----                       ---
A       @       216.239.32.21              3600
A       @       216.239.34.21              3600
A       @       216.239.36.21              3600
A       @       216.239.38.21              3600
CNAME   www     ghs.googlehosted.com.      3600
MX      @       [your email server]        [TTL]
TXT     @       [verification strings]     [TTL]
```

### Step 7: Save and Wait for Propagation

1. Double-check all entries are correct
2. Click **Save Changes** or **Apply**
3. Note the time you made these changes

**DNS Propagation Time:**
- Minimum: 15-30 minutes
- Typical: 2-4 hours
- Maximum: 24-48 hours

## Verification

### Check DNS Propagation

Use these methods to check if your DNS has propagated:

#### Method 1: Command Line

**On Mac/Linux:**
```bash
# Check www subdomain
dig www.ajfsindia.com

# Check root domain
dig ajfsindia.com

# Check CNAME
dig www.ajfsindia.com CNAME
```

**On Windows:**
```cmd
# Check www subdomain
nslookup www.ajfsindia.com

# Check root domain
nslookup ajfsindia.com
```

#### Method 2: Online Tools

Visit these websites to check global DNS propagation:
- https://dnschecker.org
- https://www.whatsmydns.net

Enter your domain and check if the new IP addresses appear globally.

#### Method 3: Browser Test

1. Open your browser
2. Visit `http://www.ajfsindia.com` (without HTTPS first)
3. If it loads your new React site, DNS is working
4. Cloud Run will automatically redirect to HTTPS

## Troubleshooting

### DNS Not Updating

**Problem:** Domain still shows old WordPress site after several hours

**Solutions:**
1. Clear your browser cache:
   - Chrome: Ctrl+Shift+Delete (Cmd+Shift+Delete on Mac)
   - Select "Cached images and files"
   - Clear data

2. Clear your computer's DNS cache:
   ```bash
   # Mac
   sudo dscacheutil -flushcache; sudo killall -HUP mDNSResponder
   
   # Windows
   ipconfig /flushdns
   
   # Linux
   sudo systemd-resolve --flush-caches
   ```

3. Use incognito/private browsing mode

4. Try a different network (mobile data vs WiFi)

### Wrong IP Addresses

**Problem:** Google Cloud gave you different IP addresses

**Solution:**
Replace the IP addresses in Step 5 with the exact ones provided by your `gcloud run domain-mappings` command.

### CNAME Already Exists Error

**Problem:** Hostinger says CNAME record for www already exists

**Solution:**
1. Find the existing CNAME record for www
2. Delete it
3. Add the new CNAME record pointing to `ghs.googlehosted.com.`

### SSL Certificate Error

**Problem:** Browser shows SSL/HTTPS error

**Solution:**
1. Wait for Google Cloud to provision SSL certificate (15-60 minutes after DNS propagation)
2. Verify DNS records are correct
3. Check Cloud Run domain mapping status:
   ```bash
   gcloud run domain-mappings describe \
     --service ajfs-frontend \
     --domain www.ajfsindia.com \
     --region us-central1
   ```

### Email Stops Working

**Problem:** Email delivery fails after DNS changes

**Solution:**
1. Verify you didn't delete MX records
2. Check that TXT records for SPF are intact
3. MX records should still point to Hostinger's mail servers
4. If you accidentally deleted them, restore from your backup screenshots

## Reverting Changes

If you need to rollback to your old WordPress site:

1. Log back into Hostinger DNS management
2. Delete the new A records and CNAME record
3. Add back your old DNS records from your backup
4. Wait for DNS propagation

## Additional Hostinger-Specific Notes

### Hostinger Interface Variations

Hostinger's interface may vary slightly depending on your plan:

**hPanel (new interface):**
- Domains → Domain name → DNS/Nameservers → DNS Zone

**Old cPanel:**
- Domains → Zone Editor

**If you can't find DNS settings:**
- Contact Hostinger support for guidance
- Provide them with this guide

### Nameservers

Make sure you're using Hostinger's nameservers (not changed to custom ones):
- `ns1.dns-parking.com`
- `ns2.dns-parking.com`

Or Hostinger's actual nameservers might be different. Check with Hostinger support if unsure.

## Email Configuration

Your email (info@ajfsindia.com, etc.) will continue to work through Hostinger as long as you keep these records:

1. **MX Records** - Don't delete these!
2. **TXT Records for SPF** - Keep these for email authentication
3. **CNAME for mail** - If present, keep it

## Post-Migration Checklist

After DNS propagation is complete:

- [ ] Website loads at www.ajfsindia.com
- [ ] Website loads at ajfsindia.com (root domain)
- [ ] HTTPS works (SSL certificate active)
- [ ] All pages load correctly
- [ ] Contact form works
- [ ] Email delivery works
- [ ] Mobile responsive design works
- [ ] All services page links work
- [ ] Team page loads
- [ ] No console errors in browser

## Support Resources

### Hostinger Support
- Live Chat: Available in hPanel
- Email: support@hostinger.com
- Knowledge Base: https://support.hostinger.com

### Google Cloud Support
- Documentation: https://cloud.google.com/run/docs/mapping-custom-domains
- Console: https://console.cloud.google.com

### DNS Tools
- DNS Checker: https://dnschecker.org
- DNS Propagation: https://www.whatsmydns.net
- MX Lookup: https://mxtoolbox.com

## Important Reminders

1. **Backup Everything:** Always backup DNS records before changes
2. **Test Thoroughly:** Test all website functionality after migration
3. **Monitor Email:** Watch for email delivery issues in the first 24 hours
4. **Keep Old Hosting:** Don't cancel Hostinger hosting until you're 100% sure everything works (keep it for at least 30 days)
5. **Document Changes:** Keep a log of what changes you made and when

---

**Need Help?**
If you encounter issues not covered in this guide, reach out to AJFS Innovations support at info@ajfsindia.com or contact Hostinger support directly.
