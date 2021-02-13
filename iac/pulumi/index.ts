import * as pulumi from '@pulumi/pulumi';
import * as digitalocean from '@pulumi/digitalocean';

const ipAddress = '185.15.72.81';

const domain = new digitalocean.Domain('domain', {
  name: 'refract-cms.com',
  ipAddress,
});

new digitalocean.DnsRecord('wildcard', {
  domain: domain.name,
  ttl: 300,
  type: 'A',
  name: '*',
  value: ipAddress,
});

new digitalocean.DnsRecord('root', {
  domain: domain.name,
  ttl: 300,
  type: 'A',
  name: '@',
  value: ipAddress,
});
