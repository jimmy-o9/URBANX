import { useEffect, useState } from "react";
import { Layout } from "@/components/Layout";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

/* ✅ Move Field OUTSIDE (fix focus issue) */
const Field = ({
  label,
  value,
  editing,
  onChange,
}: {
  label: string;
  value: string;
  editing: boolean;
  onChange: (value: string) => void;
}) => (
  <div>
    <p className="text-xs uppercase tracking-wider text-muted-foreground">
      {label}
    </p>

    {editing ? (
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 w-full rounded-md border bg-background px-3 py-2 text-sm"
      />
    ) : (
      <p className="mt-1 font-medium">{value || "Not added"}</p>
    )}
  </div>
);

const Profile = () => {
  const { user } = useAuth();

  const [profile, setProfile] = useState({
    full_name: "",
    phone: "",
    shipping_address: "",
    city: "",
    postal_code: "",
    country: "",
  });

  const [editing, setEditing] = useState(false);

  useEffect(() => {
    const loadProfile = async () => {
      if (!user) return;

      const { data } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .maybeSingle();

      if (data) {
        setProfile({
          full_name: data.full_name || "",
          phone: data.phone || "",
          shipping_address: data.shipping_address || "",
          city: data.city || "",
          postal_code: data.postal_code || "",
          country: data.country || "",
        });
      }
    };

    loadProfile();
  }, [user]);

  const updateProfile = async () => {
    if (!user) return;

    const { error } = await supabase.from("profiles").upsert(
      {
        id: user.id,
        ...profile,
      },
      { onConflict: "id" }
    );

    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Profile updated successfully.");
      setEditing(false);
    }
  };

  return (
    <Layout>
      <section className="container-editorial py-16">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
              Account
            </p>
            <h1 className="mt-2 font-serif text-4xl md:text-5xl">
              My Profile
            </h1>
          </div>

          <Button
            onClick={() => (editing ? updateProfile() : setEditing(true))}
            className="w-fit rounded-sm"
          >
            {editing ? "Save Profile" : "Edit Profile"}
          </Button>
        </div>

        <div className="mt-10 max-w-4xl overflow-hidden rounded-3xl border bg-background shadow-sm">
          {/* Header */}
          <div className="bg-secondary/40 p-8">
            <div className="flex items-center gap-5">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-background text-3xl font-semibold shadow-sm">
                {user?.email?.charAt(0).toUpperCase()}
              </div>

              <div>
                <h2 className="font-serif text-2xl">
                  {profile.full_name || "URBANX Customer"}
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  {user?.email}
                </p>
              </div>
            </div>
          </div>

          {/* Details */}
          <div className="grid gap-8 p-8 md:grid-cols-2">
            <Field
              label="Full Name"
              value={profile.full_name}
              editing={editing}
              onChange={(v) =>
                setProfile({ ...profile, full_name: v })
              }
            />

            <div>
              <p className="text-xs uppercase tracking-wider text-muted-foreground">
                Email Address
              </p>
              <p className="mt-1 font-medium">{user?.email}</p>
            </div>

            <Field
              label="Phone Number"
              value={profile.phone}
              editing={editing}
              onChange={(v) =>
                setProfile({ ...profile, phone: v })
              }
            />

            <Field
              label="Country"
              value={profile.country}
              editing={editing}
              onChange={(v) =>
                setProfile({ ...profile, country: v })
              }
            />

            <div className="md:col-span-2">
              <Field
                label="Shipping Address"
                value={profile.shipping_address}
                editing={editing}
                onChange={(v) =>
                  setProfile({ ...profile, shipping_address: v })
                }
              />
            </div>

            <Field
              label="City"
              value={profile.city}
              editing={editing}
              onChange={(v) =>
                setProfile({ ...profile, city: v })
              }
            />

            <Field
              label="Postal Code"
              value={profile.postal_code}
              editing={editing}
              onChange={(v) =>
                setProfile({ ...profile, postal_code: v })
              }
            />

            <div>
              <p className="text-xs uppercase tracking-wider text-muted-foreground">
                Account Created
              </p>
              <p className="mt-1 font-medium">
                {user?.created_at
                  ? new Date(user.created_at).toLocaleDateString()
                  : "Not available"}
              </p>
            </div>

            <div>
              <p className="text-xs uppercase tracking-wider text-muted-foreground">
                User ID
              </p>
              <p className="mt-1 break-all text-sm text-muted-foreground">
                {user?.id}
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Profile;