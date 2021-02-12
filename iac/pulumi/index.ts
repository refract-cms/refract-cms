import * as pulumi from '@pulumi/pulumi';
import * as digitalocean from '@pulumi/digitalocean';

const domain = new digitalocean.Domain('domain', {
  name: 'refract-cms.com',
  ipAddress: '185.15.72.81',
});

new digitalocean.DnsRecord('wildcard', {
  name: 'wildard',
  value: '*',
  domain: domain.name,
  type: 'A',
});
