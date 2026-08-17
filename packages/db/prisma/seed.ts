import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Starting seed...')

  // Insert settings
  await prisma.setting.upsert({
    where: { key: 'platformFeePercent' },
    update: {},
    create: {
      key: 'platformFeePercent',
      value: JSON.stringify(18),
      description: 'Platform fee percentage charged on escrow release',
    }
  })

  await prisma.setting.upsert({
    where: { key: 'whtFilerRate' },
    update: {},
    create: {
      key: 'whtFilerRate',
      value: JSON.stringify(4),
      description: 'Withholding tax rate for filers',
    }
  })

  await prisma.setting.upsert({
    where: { key: 'whtNonFilerRate' },
    update: {},
    create: {
      key: 'whtNonFilerRate',
      value: JSON.stringify(8),
      description: 'Withholding tax rate for non-filers',
    }
  })

  await prisma.setting.upsert({
    where: { key: 'slabBands' },
    update: {},
    create: {
      key: 'slabBands',
      value: JSON.stringify({
        RISING: { min: 1000, max: 10000 },
        EMERGING: { min: 10001, max: 50000 },
        ESTABLISHED: { min: 50001, max: 250000 },
        ELITE: { min: 250001, max: 1000000 },
        ICON: { min: 1000001, max: 999999999 }
      }),
      description: 'Follower count bands for each creator slab',
    }
  })

  // 1. Create Admin User
  await prisma.user.upsert({
    where: { email: 'admin@ugcstars.pk' },
    update: {},
    create: {
      role: 'ADMIN',
      email: 'admin@ugcstars.pk',
      displayName: 'System Admin',
      status: 'ACTIVE',
      phoneVerified: true,
    }
  })

  // 2. Create Brands
  const brandProfiles = [
    { name: 'TechCorp Pakistan', industry: 'Technology', domain: 'techcorp.pk' },
    { name: 'GlowUp Beauty', industry: 'Beauty', domain: 'glowup.pk' },
    { name: 'FreshBite Foods', industry: 'F&B', domain: 'freshbite.pk' }
  ]

  const brands = []
  for (const b of brandProfiles) {
    const brand = await prisma.user.upsert({
      where: { email: `contact@${b.domain}` },
      update: {},
      create: {
        role: 'BRAND',
        email: `contact@${b.domain}`,
        displayName: b.name,
        phoneVerified: true,
        brandProfile: {
          create: {
            companyName: b.name,
            industry: b.industry,
            website: `https://${b.domain}`
          }
        }
      },
      include: { brandProfile: true }
    })
    brands.push(brand)
  }

  // 3. Create Creators
  const creatorData = [
    { name: 'Ali Khan', city: 'Karachi', slab: 'RISING', followers: 5000 },
    { name: 'Zara Ahmed', city: 'Lahore', slab: 'EMERGING', followers: 25000 },
    { name: 'Bilal Qureshi', city: 'Islamabad', slab: 'ESTABLISHED', followers: 150000 },
    { name: 'Ayesha Tariq', city: 'Karachi', slab: 'ELITE', followers: 500000 },
    { name: 'Hassan Ali', city: 'Lahore', slab: 'ICON', followers: 2000000 },
    { name: 'Fatima Noor', city: 'Rawalpindi', slab: 'RISING', followers: 8000 },
    { name: 'Usman Sheikh', city: 'Faisalabad', slab: 'EMERGING', followers: 45000 },
    { name: 'Sana Malik', city: 'Islamabad', slab: 'ESTABLISHED', followers: 120000 }
  ]

  const creators = []
  for (let i = 0; i < creatorData.length; i++) {
    const c = creatorData[i]
    const creator = await prisma.user.upsert({
      where: { email: `creator${i}@ugcstars.pk` },
      update: {},
      create: {
        role: 'CREATOR',
        email: `creator${i}@ugcstars.pk`,
        displayName: c.name,
        phone: `+92300123456${i}`,
        phoneVerified: true,
        creatorProfile: {
          create: {
            displayName: c.name,
            city: c.city,
            slab: c.slab as any,
            verificationStatus: 'VERIFIED',
            socialAccounts: {
              create: [
                {
                  platform: 'INSTAGRAM',
                  handle: `@${c.name.replace(' ', '').toLowerCase()}`,
                  followerCount: c.followers,
                  verificationMethod: 'OAUTH',
                  status: 'VERIFIED',
                  verifiedAt: new Date()
                },
                {
                  platform: 'TIKTOK',
                  handle: `@${c.name.replace(' ', '').toLowerCase()}_tt`,
                  followerCount: c.followers * 1.5,
                  verificationMethod: 'MANUAL',
                  status: 'VERIFIED',
                  verifiedAt: new Date()
                }
              ]
            },
            wallet: {
              create: {
                availableBalance: 0,
                inEscrowBalance: 0,
                lifetimeEarnings: 0
              }
            },
            kycRecord: {
              create: {
                fullName: c.name,
                cnicNumber: 'enc_1234567890123',
                cnicFrontUrl: 'https://example.com/front.jpg',
                cnicBackUrl: 'https://example.com/back.jpg',
                selfieUrl: 'https://example.com/selfie.jpg',
                isFiler: true,
                fbrVerifiedAt: new Date(),
                status: 'APPROVED',
                reviewedAt: new Date(),
              }
            }
          }
        }
      },
      include: {
        creatorProfile: {
          include: { wallet: true }
        }
      }
    })
    creators.push(creator)
  }

  // 4. Create Campaigns & Flow
  // Campaign 1: COMPLETED + PAID
  const c1 = await prisma.campaign.create({
    data: {
      brandProfileId: brands[0].brandProfile!.id,
      title: 'Summer Tech Gadgets Review',
      category: 'Technology',
      description: 'Review our latest power bank.',
      briefAssets: [],
      contentRights: 'REUSE_LIMITED',
      deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      budget: 100000,
      status: 'PAID',
      deliverables: [{ type: 'VIDEO', count: 1, description: '1 min reel' }],
      campaignSlots: {
        create: {
          creatorProfileId: creators[2].creatorProfile!.id,
          status: 'PAID',
          agreedBudget: 50000,
          submission: {
            create: {
              postUrl: 'https://instagram.com/p/123456',
              screenshots: ['url1', 'url2'],
              approvedAt: new Date()
            }
          },
          escrowTransactions: {
            create: [
              {
                type: 'FUND',
                amount: 50000,
                idempotencyKey: 'fund_1',
                status: 'COMPLETED',
                processedAt: new Date()
              },
              {
                type: 'RELEASE',
                amount: 50000,
                platformFee: 9000,
                whtAmount: 2000,
                netAmount: 39000,
                idempotencyKey: 'rel_1',
                status: 'COMPLETED',
                processedAt: new Date()
              }
            ]
          }
        }
      }
    }
  })

  // Update Wallet & Ledger for Campaign 1
  const c1Wallet = creators[2].creatorProfile!.wallet!
  await prisma.wallet.update({
    where: { id: c1Wallet.id },
    data: { availableBalance: 39000, lifetimeEarnings: 39000 }
  })
  
  await prisma.ledgerEntry.create({
    data: {
      walletId: c1Wallet.id,
      type: 'CREDIT',
      category: 'ESCROW_RELEASE',
      amount: 39000,
      balanceAfter: 39000,
      description: 'Payment for Summer Tech Gadgets Review'
    }
  })

  // Campaign 2: IN_PROGRESS (draft submitted)
  const c2 = await prisma.campaign.create({
    data: {
      brandProfileId: brands[1].brandProfile!.id,
      title: 'GlowUp Skincare Routine',
      category: 'Beauty',
      description: 'Show your morning skincare routine.',
      briefAssets: [],
      contentRights: 'REUSE_PERPETUAL',
      deadline: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
      budget: 200000,
      status: 'IN_PROGRESS',
      deliverables: [{ type: 'VIDEO', count: 2, description: 'TikTok videos' }],
      campaignSlots: {
        create: {
          creatorProfileId: creators[3].creatorProfile!.id,
          status: 'DRAFT_SUBMITTED',
          agreedBudget: 80000,
          drafts: {
            create: {
              fileUrl: 'https://example.com/draft1.mp4',
              status: 'SUBMITTED'
            }
          }
        }
      }
    }
  })

  // Campaign 3: OPEN (plan submitted)
  const c3 = await prisma.campaign.create({
    data: {
      brandProfileId: brands[2].brandProfile!.id,
      title: 'FreshBite Organic Snacks',
      category: 'F&B',
      description: 'Taste test our new healthy snacks.',
      briefAssets: [],
      contentRights: 'NONE',
      deadline: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000),
      budget: 50000,
      status: 'OPEN',
      deliverables: [{ type: 'PHOTO', count: 3, description: 'Carousel post' }],
      campaignSlots: {
        create: {
          creatorProfileId: creators[0].creatorProfile!.id,
          status: 'PLAN_SUBMITTED',
          agreedBudget: 20000,
          contentPlans: {
            create: {
              concept: 'Picnic setting with snacks',
              status: 'SUBMITTED',
            }
          }
        }
      }
    }
  })

  // Campaign 4: FUNDED/OPEN (no slots yet)
  const c4 = await prisma.campaign.create({
    data: {
      brandProfileId: brands[0].brandProfile!.id,
      title: 'Tech Accessories Unboxing',
      category: 'Technology',
      description: 'Unbox our latest accessories.',
      briefAssets: [],
      contentRights: 'REUSE_LIMITED',
      deadline: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000),
      budget: 150000,
      status: 'FUNDED',
      fundedAt: new Date(),
      escrowRef: 'ref_xyz123',
      deliverables: [{ type: 'VIDEO', count: 1, description: 'Unboxing video' }]
    }
  })

  // Add some notifications
  await prisma.notification.create({
    data: {
      userId: creators[2].id,
      type: 'PAYMENT_RELEASED',
      title: 'Payment Received',
      body: 'You received Rs. 39,000 for Summer Tech Gadgets Review',
      read: false
    }
  })

  console.log('Seed completed successfully.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
